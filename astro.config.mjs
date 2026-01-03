// @ts-check

import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://sitagakey.me',
  integrations: [
    sitemap(),
    icon({
      iconDir: 'src/assets/icons'
    }),
    react()
  ]
});
