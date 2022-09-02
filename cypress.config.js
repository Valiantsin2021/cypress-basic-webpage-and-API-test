const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'vzoi34',
  e2e: {
    setupNodeEvents(on, config) {
    },
    excludeSpecPattern: process.env.CI ? ['cypress/e2e/all.cy.js'] : [],
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true
  }
});
