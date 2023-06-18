import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {

    video: false,
    baseUrl: 'http://localhost:4200',
    chromeWebSecurity: false,
  },
});
