const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
Cypress.on('uncaught:exception', (err) => {
    /* returning false here prevents Cypress from failing the test */
    if (resizeObserverLoopErrRe.test(err.message)) {
        return false
    }
    if (test.state === 'failed') {
        let item = runnable
        const nameParts = [runnable.title]
    
        // Iterate through all parents and grab the titles
        while (item.parent) {
          nameParts.unshift(item.parent.title)
          item = item.parent
        }
    
        const fullTestName = nameParts
                .filter(Boolean)
                .join(' -- ')           // this is how cypress joins the test title fragments
    
        const imageUrl = `screenshots/${
          Cypress.spec.name
        }/${fullTestName} (failed).png`
    
        addContext({ test }, imageUrl)
      }
},
Cypress.Screenshot.defaults({
  capture: 'viewport'
})

)
import '@testing-library/cypress/add-commands'
require('cypress-iframe')

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })