import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://ottowoolf.github.io',
  base: '/OPortfolio', // This adds the prefix to all generated links
});