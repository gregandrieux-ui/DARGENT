#!/usr/bin/env node
// QA post-build : le seul test du projet. Échoue (exit 1) dès qu'une règle de la spec ou du pre-flight casse.
// Usage : node scripts/check-site.mjs dist
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = process.argv[2] ?? 'dist';
const errors = [];
const warns = [];
const warn = (m) => warns.push(m);
const err = (m) => errors.push(m);

// --- collecte des pages ---
const htmlFiles = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && htmlFiles.push(p); } })(dist);
const pages = htmlFiles.filter((f) => !f.endsWith('410.html')).map((f) => {
  const html = readFileSync(f, 'utf8');
  const path = '/' + relative(dist, f).replace(/index\.html$/, '');
  const m = (re) => (html.match(re) ?? [])[1] ?? '';
  return { f, path, html, title: m(/<title>([^<]*)<\/title>/), desc: m(/<meta name="description" content="([^"]*)"/), noindex: /name="robots" content="noindex/.test(html), h1s: [...html.matchAll(/<h1[^>]*>/g)].length,
    body: html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '') };
});
const published = pages.filter((p) => !p.noindex);
const pathSet = new Set(pages.map((p) => p.path));
const decode = (s) => s.replace(/&#39;|&#x27;/g, '’').replace(/&quot;/g, '"').replace(/&amp;/g, '&');

// --- unicité et longueurs ---
const seenT = new Map(), seenD = new Map();
for (const p of pages) {
  if (p.h1s !== 1) err(`${p.path}: ${p.h1s} H1`);
  if (!p.title) err(`${p.path}: pas de <title>`);
  if (decode(p.title).length > 60) err(`${p.path}: title ${decode(p.title).length} > 60`);
  if (!p.desc) err(`${p.path}: pas de meta description`);
  if (decode(p.desc).length > 160) err(`${p.path}: meta ${decode(p.desc).length} > 160`);
  if (seenT.has(p.title)) err(`${p.path}: title dupliqué avec ${seenT.get(p.title)}`); else seenT.set(p.title, p.path);
  if (seenD.has(p.desc)) err(`${p.path}: meta dupliquée avec ${seenD.get(p.desc)}`); else seenD.set(p.desc, p.path);
}

// --- liens internes, maillage, profondeur ---
const inbound = new Map(published.map((p) => [p.path, new Set()]));
const graph = new Map();
for (const p of pages) {
  const main = (p.html.match(/<main[\s\S]*?<\/main>/) ?? [''])[0].replace(/<nav class="breadcrumb"[\s\S]*?<\/nav>/, '');
  const hrefs = [...p.html.matchAll(/href="([^"#?]+)[^"]*"/g)].map((m) => m[1]).filter((h) => h.startsWith('/') && !h.startsWith('//'));
  graph.set(p.path, new Set(hrefs));
  for (const h of hrefs) {
    if (/\.(pdf|jpg|jpeg|png|svg|mp4|ico|xml|txt|css|js|woff2)$/i.test(h)) { if (!existsSync(join(dist, h))) err(`${p.path}: fichier manquant ${h}`); continue; }
    const norm = h.endsWith('/') ? h : h + '/';
    if (!pathSet.has(norm)) err(`${p.path}: lien interne cassé ${h}`);
  }
  const mainHrefs = [...main.matchAll(/href="([^"#?]+)[^"]*"/g)].map((m) => m[1]).filter((h) => h.startsWith('/'));
  for (const h of mainHrefs) { const n = h.endsWith('/') ? h : h + '/'; if (inbound.has(n) && n !== p.path) inbound.get(n).add(p.path); }
  if (/processx|sites\.google\.com|blogspot/i.test(p.html)) err(`${p.path}: lien vers agence ou satellite`);
}
for (const [path, from] of inbound) { if (path !== '/' && path !== '/merci/' && from.size < 3) err(`${path}: ${from.size} lien(s) entrant(s) hors nav/footer (min 3)`); }
const depth = new Map([['/', 0]]); const q = ['/'];
while (q.length) { const cur = q.shift(); for (const h of graph.get(cur) ?? []) { const n = h.endsWith('/') ? h : h + '/'; if (pathSet.has(n) && !depth.has(n)) { depth.set(n, depth.get(cur) + 1); q.push(n); } } }
for (const p of published) { const d = depth.get(p.path); if (d === undefined) err(`${p.path}: inaccessible depuis l'accueil`); else if (d > 3) err(`${p.path}: profondeur ${d} > 3`); }

// --- contenu interdit et pre-flight ---
for (const p of pages) {
  const text = p.body.replace(/<[^>]+>/g, ' ');
  if (/[—–]/.test(text)) err(`${p.path}: tiret cadratin ou demi-cadratin`);
  if (/€/.test(text) && !/aides-financieres|mentions-legales|cgu|politique|protection|cookies/.test(p.path)) err(`${p.path}: montant en € hors page aides`);
  const lines = text.split('\n'); for (const l of lines) if ((l.match(/·/g) ?? []).length > 1) warn(`${p.path}: plusieurs points médians sur une ligne`);
  if (/(24 ?h|sous 48 ?h|garantie? \d|économies garanties)/i.test(text)) warn(`${p.path}: promesse de délai ou de garantie à vérifier`);
  const scripts = [...p.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!scripts.length) err(`${p.path}: pas de JSON-LD`);
  for (const s of scripts) { try { const j = JSON.parse(s[1]); if (!j['@graph']?.length) err(`${p.path}: JSON-LD sans @graph`); } catch { err(`${p.path}: JSON-LD invalide`); } }
  if (/text-transform:\s*uppercase[^"]*letter-spacing/.test(p.html)) warn(`${p.path}: eyebrow probable`);
  if (/box-shadow:\s*0 0 0/.test(p.html)) err(`${p.path}: halo box-shadow`);
  if (/border-left:\s*[3-9]px solid/.test(p.html)) err(`${p.path}: border-left coloré épais`);
  if (!/<a[^>]*href="tel:/.test(p.html)) warn(`${p.path}: téléphone non cliquable`);
  // un libellé par intention devis
  const mainHtml = (p.body.match(/<main[\s\S]*?<\/main>/) ?? [''])[0];
  const labels = [...mainHtml.matchAll(/<a[^>]*href="\/devis\/"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => m[1].replace(/<[^>]+>/g, '').trim()).filter((l) => l.length < 60);
  const set = new Set(labels); if (set.size > 2) warn(`${p.path}: ${set.size} libellés différents pour l'intention devis : ${[...set].join(' | ')}`);
}

// --- sitemap et draft ---
const sm = existsSync(join(dist, 'sitemap-0.xml')) ? readFileSync(join(dist, 'sitemap-0.xml'), 'utf8') : '';
for (const p of pages) { const inSm = sm.includes(`https://dargent-thermique.fr${p.path}`); if (p.noindex && inSm) err(`${p.path}: noindex mais dans le sitemap`); if (!p.noindex && !inSm) err(`${p.path}: absent du sitemap`); }

// --- redirections : couverture des 26 URL de l'ancien sitemap, pas de chaîne ---
const rules = readFileSync(join(dist, '_redirects'), 'utf8').split('\n').filter((l) => l.trim() && !l.startsWith('#')).map((l) => l.trim().split(/\s+/));
const sources = rules.map((r) => r[0].replace(/^https?:\/\/(www\.)?climatisation-chauffage-orleans\.com/, ''));
const targets = rules.map((r) => r[1].replace(/^https:\/\/dargent-thermique\.fr/, '')).filter((t) => !t.includes(':splat'));
const oldSitemap = ['/', '/solutions/plancher-chauffant/', '/politique-confidentialite/', '/societe/historique/', '/partenaires/', '/solutions/connectivite/', '/solutions/climatisation-pompe-a-chaleur/pompe-a-chaleur-basse-temperature/', '/referencement-site-internet-45.php', '/contact/', '/mentions-legales/', '/referencement-site-internet-orleans.php', '/societe/engagements-ecologiques/', '/solutions/ventilation/', '/cgu/', '/protection-donnees-personnelles/', '/solutions/climatisation-pompe-a-chaleur/pompe-a-chaleur-hybride/', '/postuler/', '/cookies/', '/solutions/climatisation-pompe-a-chaleur/', '/references/clients/', '/solutions/maintenance-climatisation/', '/societe/qualifications/', '/references/realisations/', '/solutions/chaudiere-condensation/', '/solutions/climatisation-pompe-a-chaleur/climatisation-reversible/', '/referencement-site-internet-loiret.php', '/solutions/ballon-thermodynamique/', '/solutions/climatisation-pompe-a-chaleur/pompe-a-chaleur-haute-temperature/', '/aides-financieres/'];
for (const u of oldSitemap) {
  const covered = sources.includes(u) || sources.includes('/*') || pathSet.has(u);
  if (!covered) err(`_redirects: ancienne URL non couverte ${u}`);
  if (sources.includes(u)) { const t = rules[sources.indexOf(u)][1]; const tn = t.replace(/^https:\/\/dargent-thermique\.fr/, ''); if (tn.startsWith('/') && !tn.endsWith('.html') && !pathSet.has(tn)) err(`_redirects: cible inexistante ${u} -> ${t}`); }
}
for (const t of targets) if (sources.includes(t) && !t.endsWith('.html')) err(`_redirects: chaîne, la cible ${t} est aussi une source`);

// --- rapport ---
console.log(`${pages.length} pages (${published.length} indexables), ${errors.length} erreur(s), ${warns.length} avertissement(s)`);
for (const w of warns) console.log('  warn  ' + w);
for (const e of errors) console.log('  ERROR ' + e);
process.exit(errors.length ? 1 : 0);
