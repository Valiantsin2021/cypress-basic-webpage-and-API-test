const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'vzoi34',
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
  }
});
