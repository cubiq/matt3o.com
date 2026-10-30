import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { rehypeHugoMedia } from './src/utils/rehype-hugo-media.mjs';

export default defineConfig({
  site: 'https://matt3o.com',
  integrations: [mdx(), sitemap()],
  markdown: {
    rehypePlugins: [rehypeHugoMedia],
    shikiConfig: {
      theme: 'vitesse-dark',
      wrap: true,
      langAlias: {
        conf: 'ini',
      },
    },
  },
});
