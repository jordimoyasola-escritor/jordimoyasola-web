import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://www.jordimoyasola.com',
  output: 'hybrid',
  adapter: netlify({
    edgeMiddleware: true,
    imageCDN: false,
  }),
  compressHTML: true,
});
