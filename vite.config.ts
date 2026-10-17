/// <reference types="vitest/config" />
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Replaces __SITE_URL__ in index.html (canonical, Open Graph, JSON-LD) with the absolute site URL.
 * Netlify exposes the production URL as `URL` at build time; `VITE_SITE_URL` overrides it.
 */
function siteUrl(url: string): Plugin {
  return {
    name: 'portfolio:site-url',
    transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', url),
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const url = (env.VITE_SITE_URL || env.URL || '').replace(/\/$/, '');

  return {
    plugins: [react(), tailwindcss(), siteUrl(url)],
    build: {
      target: 'es2022',
      sourcemap: false,
      // three.js is lazy-loaded into its own chunk and is expected to be large.
      chunkSizeWarningLimit: 700,
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      css: false,
      restoreMocks: true,
    },
  };
});
