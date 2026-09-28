import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';

// Pages enfants PAC, rubriques Climatisation, Chauffage, Entretien-dépannage, Entreprise et leurs enfants : chaque section `##` devient une carte empilée au scroll (.stack-card, cf. global.css).
// La carte N recule sur la view-timeline de la carte N+1 ; timeline-scope sur .stack rend les noms visibles aux sœurs.
const stackCards = {
  name: 'stack-cards',
  before(root, ctx) {
    const before = [];
    const cards = [];
    for (const node of root.children) {
      if (node.type === 'element' && node.tagName === 'h2') cards.push([node]);
      else (cards.at(-1) ?? before).push(node);
    }
    if (!cards.length) return;
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
  markdown: { processor: satteri({ hastPlugins: [({ fileURL }) => /\/pages\/(pompe-a-chaleur\/|climatisation|chauffage|entretien-depannage|entreprise)/.test(fileURL?.pathname ?? '') && stackCards] }) },
  integrations: [
    sitemap({
      // ponytail: draft pages are also marked noindex by <Seo>; this keeps them out of the XML sitemap
      filter: (page) => !page.includes('/merci/') && !page.includes('/zones-intervention/orleans/'),
    }),
  ],
});
