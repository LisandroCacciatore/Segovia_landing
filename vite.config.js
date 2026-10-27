import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { site } from './src/data/site.js';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const noindex = env.VITE_NOINDEX === 'true';

  return {
    plugins: [
      react(),
      {
        name: 'noindex-meta',
        transformIndexHtml(html) {
          if (!noindex) return html;
          return {
            html,
            tags: [
              {
                tag: 'meta',
                attrs: { name: 'robots', content: 'noindex, nofollow' },
                injectTo: 'head',
              },
            ],
          };
        },
      },
      {
        name: 'robots-generator',
        generateBundle() {
          const content = noindex
            ? 'User-agent: *\nDisallow: /'
            : `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml`;
          this.emitFile({ type: 'asset', fileName: 'robots.txt', source: content });
        },
      },
    ],
    base: env.VITE_BASE_PATH || '/',
  };
});
