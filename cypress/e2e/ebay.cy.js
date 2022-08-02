describe('Opens ebay.es and searches for watches Suunto 9', () => {
  it('Should open ebay.com', () => {
    cy.visit('https://ebay.es')
    cy.title()
      .should('eq', 'Comprar y Vender Electrónica, Moda, Móviles y mucho más | eBay')
    })

  it('Should open "Electronica" link on ebay.com', () => {
    // cy.get("#gdpr-banner-accept", { timeout: 10000 }).should('be.visible').click()
    cy.get("#mainContent > div.hl-cat-nav > ul > li:nth-child(3) > a")
    .should('be.visible')
    .click()
  })

  it('Should open "Relojes inteligentes" link on ebay.com', () => {
    cy.get("section.b-module.b-visualnav  a:nth-child(8)")
    .should('be.visible')
    .click()
  })

  it('Should search for "Suunto 9" smartwatch on ebay.com', () => {
    cy.url().should('include', '/b/Smartwatches/')
    cy.get('input.gh-tb.ui-autocomplete-input')
      .type('Suunto 9')
    cy.get('#gh-btn')
      .click()
    cy.get("img[alt='Reloj deportivo - Suunto 9, Negro, Pulsómetro, Barómetro, 120 horas Autonomía']")
      .should('have.attr', 'src')
    // cy.get('div.s-item__detail.s-item__detail--primary > span.s-item__price')
    //   .eq(1)
    //   .should('contain.text', '266,85 EUR')
    cy.get('#srp-river-results > ul > li:nth-child(1) > div > div.s-item__info.clearfix > a > h3')
      .should('have.text', 'Reloj deportivo - Suunto 9, Negro, Pulsómetro, Barómetro, 120 horas Autonomía')
  })

  it('Should search the "Suunto 9 Negro" smartwatch on ebay.com using checkbox', () => {
    cy.get('input[aria-label="Negro"]')
    .should('exist')
    .eq(0)
    .check()
  })
  it('Should check the existense of "Suunto 9 Negro" smartwatch on ebay.com', () => {
    // cy.get('div.s-item__detail.s-item__detail--primary > span.s-item__price')
    //   .eq(1)
    //   .should('have.text', '369,00 EUR')
    cy.get("img[alt='Reloj deportivo - Suunto 9, Negro, Pulsómetro, Barómetro, 120 horas Autonomía']")
      .should('have.attr', 'src')
    cy.get('#srp-river-results > ul > li:nth-child(2) > div > div.s-item__info.clearfix > a > h3')
      .should('contain.text', 'Reloj deportivo - Suunto 9, Negro')

  })

})