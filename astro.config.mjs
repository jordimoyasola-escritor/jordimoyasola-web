import { defineConfig } from 'astro/config';
import sitemap          from '@astrojs/sitemap';
import netlify          from '@astrojs/netlify';

export default defineConfig({
  site:    'https://www.jordimoyasola.com',

  // Hybrid: SSG para todo el sitio + SSR solo para:
  //   - /api/*             (endpoints de formularios)
  //   - middleware.ts      (detección de idioma en /)
  output:  'hybrid',
  adapter: netlify({
    edgeMiddleware: true,  // Middleware corre en Netlify Edge (más rápido, sin cold start)
    imageCDN:       false, // Usamos nuestro WebP propio
  }),

  integrations: [
    sitemap({
      filter: page =>
        !page.includes('/api/')  &&
        !page.includes('/en/')   ,   // EN excluido del sitemap hasta versión completa
      changefreq: 'weekly',
      priority:   0.7,
      lastmod:    new Date(),
    }),
  ],

  compressHTML: true,
});
