// @ts-check

import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  site: 'https://sitagakey.me',
  integrations: [
    sitemap(),
    icon({
      iconDir: 'src/assets/icons'
    }),
    react(),
    partytown({
      config: {
        forward: ['dataLayer.push']
      }
    })
  ]
});
