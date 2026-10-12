#!/usr/bin/env node
// Crawle le site déployé et liste dans Verification.md les pages portant un encart « À confirmer avant publication ».
// Usage : node scripts/find-to-confirm.mjs [baseUrl]
import { writeFileSync } from 'node:fs';

const BASE = (process.argv[2] ?? 'https://6abd70eafb907b00085d7510--dargent.netlify.app').replace(/\/$/, '');
const origin = new URL(BASE).origin;
const SKIP = /\.(pdf|jpe?g|png|webp|avif|gif|svg|ico|xml|txt|css|js|json|zip|docx?|xlsx?)$/i;

const decode = (s) => s
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&nbsp;/g, ' ').replace(/&rsquo;/g, '’').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const text = (s) => decode(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

const seen = new Set(['/']);
let queue = ['/'];
const results = [];
let crawled = 0;

// ponytail: lots de 8 en parallèle, suffisant pour ~40 pages
while (queue.length) {
  const batch = queue.splice(0, 8);
  await Promise.all(batch.map(async (path) => {
    let html;
    try {
      const res = await fetch(BASE + path);
      if (!res.ok || !res.headers.get('content-type')?.includes('text/html')) { console.warn(`${res.status} ${path}`); return; }
      html = await res.text();
    } catch (e) { console.warn(`ERR ${path}: ${e.message}`); return; }
    crawled++;

    for (const [, href] of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
      let u;
      try { u = new URL(decode(href), BASE + path); } catch { continue; }
      if (u.origin !== origin || SKIP.test(u.pathname) || seen.has(u.pathname)) continue;
      seen.add(u.pathname);
      queue.push(u.pathname);
    }

    const items = [];
    for (const [aside] of html.matchAll(/<aside class="todo"[\s\S]*?<\/aside>/g)) {
      for (const [, p] of aside.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)) items.push(text(p));
      for (const [, li] of aside.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)) items.push(text(li));
    }
    if (items.length) results.push({ path, title: text((html.match(/<title>([\s\S]*?)<\/title>/) ?? [])[1] ?? ''), items: [...new Set(items.filter(Boolean))] });
  }));
}

results.sort((a, b) => a.path.localeCompare(b.path));
const out = [
  '# Vérification — encarts « À confirmer avant publication »',
  '',
  `Site : ${BASE}/  `,
  `Généré le ${new Date().toISOString().slice(0, 10)} — ${results.length} page(s) concernée(s) sur ${crawled} parcourue(s).`,
  '',
  ...results.flatMap((r) => [`## [${r.path}](${BASE}${r.path})`, '', `*${r.title}*`, '', ...r.items.map((i) => `- [ ] ${i}`), '']),
].join('\n');
writeFileSync('Verification.md', out);
console.log(`${results.length}/${crawled} pages avec encart → Verification.md`);
