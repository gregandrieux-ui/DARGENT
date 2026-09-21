import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dargent-thermique.fr',
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // ponytail: draft pages are also marked noindex by <Seo>; this keeps them out of the XML sitemap
      filter: (page) => !page.includes('/merci/') && !page.includes('/zones-intervention/orleans/'),
    }),
  ],
});
