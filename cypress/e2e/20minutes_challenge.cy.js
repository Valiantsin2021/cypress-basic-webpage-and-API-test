describe('Check contact message can be seen and read on admin portal', () => {
  it('Open a browser and navigate to https://automationintesting.online/', () => {
    cy.visit('/')
    cy.url().should('be.equal', 'https://automationintesting.online/')
  })
  it('Complete the Contact Us form', () => {
    cy.get('#name').clear().type(Cypress.env('name'))
    cy.get('#email').clear().type(Cypress.env('email'))
    cy.get('#phone').clear().type(Cypress.env('phone'))
    cy.get('#subject').clear().type(Cypress.env('subject'))
    cy.get('#description').clear().type(Cypress.env('message'))
    cy.get('#submitContact').click()
    cy.get('[class="row contact"] h2').should(
      'have.text',
      `Thanks for getting in touch ${Cypress.env('name')}!`
    )
    cy.get('[class="row contact"] p')
      .eq(1)
      .should('have.text', `${Cypress.env('subject')}`)
  })
  it('Log into the admin panel found at Restful-booker-platform demo', () => {
    cy.on('uncaught:exception', () => false)
    cy.visit('#/admin/login')
    cy.get('#username').clear().type('admin')
    cy.get('#password').clear().type('password')
    cy.get('#doLogin').click()
    cy.url().should(
      'be.equal',
      'https://automationintesting.online/#/admin/login'
    )
  })
  it('Access the created message in Restful-booker-platform demo', () => {
    cy.get('[href="#/admin/messages"]').click()
    cy.get('.row.detail')
      .should('have.length.greaterThan', 0)
      .contains('.row', Cypress.env('subject'))
      .should('have.class', 'read-false')
    cy.contains(Cypress.env('name')).should('exist').and('be.visible')
    cy.contains(Cypress.env('subject'))
      .should('exist')
      .and('be.visible')
      .click()
    cy.get('[data-testid="message"] p').as('list').should('have.length', 5)
    cy.get('@list')
      .eq(0)
      .should('have.text', `From: ${Cypress.env('name')}`)
    cy.get('@list')
      .eq(1)
      .should('have.text', `Phone: ${Cypress.env('phone')}`)
    cy.get('@list')
      .eq(2)
      .should('have.text', `Email: ${Cypress.env('email')}`)
    cy.get('@list').eq(3).should('have.text', Cypress.env('subject'))
    cy.get('@list').eq(4).should('have.text', Cypress.env('message'))
    cy.contains('button', 'Close').click()
    cy.contains('.row.detail', Cypress.env('subject'))
      .should('have.class', 'read-true')
      .and('not.have.class', 'read-false')
    cy.get('[data-testid="DeleteMessage1"]').click()
    cy.contains('Logout').click()

    cy.request('POST', '/auth/login', {
      username: 'admin',
      password: 'password'
    })
    cy.visit('#/admin/login')
    cy.contains('a', 'Logout').should('be.visible').scrollIntoView().click()
  })
  it.only('Cypress studio', () => {
    cy.visit('/')
    cy.get('div.pigeon-overlays')
      .should('be.visible')
      .and('have.css', 'position')
      .should('be.equal', 'absolute')
  })
})
