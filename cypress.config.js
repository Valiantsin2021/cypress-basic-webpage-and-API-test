const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'vzoi34',
  chromeWebSecurity: false,
  e2e: {
    env: {
      token: 'a3672aea6955926bf817d58232ae42882c6eaba1d6a5a10d148482a884ff354d',
      urlGoRestApi: 'https://gorest.co.in/public/v2/users/'
    },
    setupNodeEvents(on, config) {
    },
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true
  },
  retries: {
      runMode: 2,
      openMode: 1,
  },
});
