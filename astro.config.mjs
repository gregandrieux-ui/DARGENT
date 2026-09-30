import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';

// Rubriques PAC, Climatisation, Chauffage, Entretien-dépannage, Entreprise (pages mères et enfants) : chaque section `##` devient une carte empilée au scroll (.stack-card, cf. global.css).
// La carte N recule sur la view-timeline de la carte N+1 ; timeline-scope sur .stack rend les noms visibles aux sœurs.
const stackCards = {
  name: 'stack-cards',
  before(root, ctx) {
    const before = [];
    const cards = [];
    for (let node of root.children) {
      // Tableau dans une carte : conteneur défilant .compare, sinon sa largeur mini élargit la carte sur mobile.
      if (node.type === 'element' && node.tagName === 'table') node = { type: 'element', tagName: 'div', properties: { className: ['compare'] }, children: [node] };
      if (node.type === 'element' && node.tagName === 'h2') cards.push([node]);
      else (cards.at(-1) ?? before).push(node);
    }
    if (!cards.length) return;
    // « Nos qualifications », « Nos valeurs », « Ils nous font confiance » : chaque ### devient une slide d'un carrousel à défilement latéral (intro avant le 1er ### hors carrousel).
    const text = (n) => (n.value ?? n.children?.map(text).join('') ?? '');
    for (const card of cards) {
      const title = text(card[0]).trim();
      if (!['Nos qualifications', 'Nos valeurs', 'Ils nous font confiance'].includes(title)) continue;
      const first = card.findIndex((c) => c.tagName === 'h3');
      if (first < 0) continue;
      const slides = [];
      for (const c of card.slice(first)) {
        if (c.tagName === 'h3') slides.push({ type: 'element', tagName: 'div', properties: { className: ['slide'] }, children: [c] });
        else slides.at(-1).children.push(c);
      }
      const btn = (dir, label, glyph) => ({ type: 'element', tagName: 'button', properties: { type: 'button', className: ['carousel-btn'], dataDir: dir, ariaLabel: label }, children: [{ type: 'text', value: glyph }] });
      const track = { type: 'element', tagName: 'div', properties: { className: ['carousel'], tabindex: 0, role: 'region', ariaLabel: title }, children: slides };
      card.splice(first, card.length, { type: 'element', tagName: 'div', properties: { className: ['carousel-wrap'] }, children: [btn('-1', 'Entrée précédente', '‹'), track, btn('1', 'Entrée suivante', '›')] });
    }
    const n = cards.length;
    const sections = cards.map((children, i) => ({
      type: 'element', tagName: 'section',
      properties: {
        className: ['stack-card'],
        dataN: String(i + 1).padStart(2, '0'),
        style: `--i:${i};view-timeline-name:--card-${i + 1}` + (i < n - 1 ? `;animation-timeline:--card-${i + 2}` : ''),
      },
      children,
    }));
    const scope = sections.map((_, i) => `--card-${i + 1}`).join(',');
    ctx.replaceNode(root, { type: 'root', children: [...before, { type: 'element', tagName: 'div', properties: { className: ['stack'], style: `timeline-scope:${scope}` }, children: sections }] });
  },
};

export default defineConfig({
  site: 'https://dargent-thermique.fr',
  trailingSlash: 'always',
  build: { format: 'directory' },
  markdown: { processor: satteri({ hastPlugins: [({ fileURL }) => /\/pages\/(pompe-a-chaleur|climatisation|chauffage|entretien|depannage|entreprise)(\/|\.md$)/.test(fileURL?.pathname ?? '') && stackCards] }) },
  integrations: [
    sitemap({
      // ponytail: draft pages are also marked noindex by <Seo>; this keeps them out of the XML sitemap
      filter: (page) => !page.includes('/merci/') && !page.includes('/zones-intervention/orleans/'),
    }),
  ],
});
