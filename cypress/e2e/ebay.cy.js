describe('Opens ebay.es and searches for watches Suunto 9', {
  retries: {
    runMode: 2,
    openMode: 1,
  }
}, () => {
  it('Should open ebay.com', () => {
    cy.visit('https://ebay.es')
    cy.title()
      .should('eq', 'Comprar y Vender Electrónica, Moda, Móviles y mucho más | eBay')
    })
  it('Should open "Electronica" link on ebay.com', () => {
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
    cy.contains(/Reloj deportivo - Suunto 9/i)
    .should('exist')
    .should('contain.text', 'Reloj deportivo')
    .and('have.attr', 'href')
  })
  it('Should search the "Suunto 9 Negro" smartwatch on ebay.com using checkbox', () => {
    cy.get('input[aria-label="Negro"]')
    .should('exist')
    .eq(0)
    .check()
  })
  it('Should check the existense of "Suunto 9 Negro" smartwatch on ebay.com', () => {
    cy.get("img[class='s-item__image-img']")
    .eq(2)
    .should('have.attr', 'src')
    cy.get('span[aria-level="3"]')
    .eq(1)
    .should('contain.text', 'Reloj deportivo - Suunto 9')
    cy.screenshot('Suunto-9-Negro')
  })
})