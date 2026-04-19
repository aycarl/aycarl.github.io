import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.aycarl.com',
  base: '/',

  // Build output directory for the static site
  outDir: './dist',

  // Public assets served at the site root
  publicDir: './public',

  // Static output settings
  build: {
    // Use directory-style routes such as /about/index.html
    format: 'directory',
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
