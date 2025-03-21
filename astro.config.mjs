import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
//   site: 'https://astrofy-template.netlify.app',
  site: 'https://github.com/beavct/beavct.github.io',
//   base: 'my-repo',
  integrations: [mdx(), sitemap(), tailwind()]
});