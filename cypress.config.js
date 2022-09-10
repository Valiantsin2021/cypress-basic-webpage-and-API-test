const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'vzoi34',
  chromeWebSecurity: false,
  e2e: {
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
