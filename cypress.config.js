const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'vzoi34',
  chromeWebSecurity: false,
  e2e: {
    env: {
      GoRestApiToken: 'a3672aea6955926bf817d58232ae42882c6eaba1d6a5a10d148482a884ff354d',
      SimpleBookApiToken: '45b71d76bca653a3dc7112f0ae9bd72855c55ae0332bab9b12768c2c28c06f1b',
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
