import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [tailwind(), react()],
  site: 'https://ottowoolf.github.io',
  base: '/OPortfolio', // This adds the prefix to all generated links
});