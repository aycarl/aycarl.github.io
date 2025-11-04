import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.aycarl.com',
  base: '/',

  // Build output directory
  outDir: './dist',

  // Public assets directory
  publicDir: './public',

  // GitHub Pages configuration
  build: {
    // Output assets to a flat structure for GitHub Pages
    format: 'directory',
  },

  vite: {
    plugins: [tailwindcss()],
  },
});