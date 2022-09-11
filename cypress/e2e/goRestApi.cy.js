describe('Open GoRest api url and test http requests GET, POST, PATCH and DELETE', () => {
  let userId;
  let newUser = {
    name: 'Ondatra Zbyshek',
    email: 'compass@mail.com',
    gender: 'male',
    status: 'active'
  }
  let patchedUser = {
    name: 'Zbyl Onder',
    email: 'ontime@mail.com',
    gender: 'female',
    status: 'inactive'
  }
  it('should successfully perform GET request on GoRest api', () => {
      cy.request(Cypress.env('urlGoRestApi'))
      .as('request')
      cy.get('@request')
      .then(response => {
          expect(response.status).to.be.equal(200);
          assert.isArray(response.body)
          expect(response.body.length).to.eq(10)
          for(let obj of response.body) {
            expect(obj).to.have.keys(['id', 'name', 'email', 'gender', 'status'])
          }
      });
  })
  it('should successfully perform POST request on GoRest api and create new user', () => {
    cy.request({
      method: 'POST',
      url: Cypress.env('urlGoRestApi'),
      auth: {
        bearer: Cypress.env('GoRestApiToken')
      },       
      body: newUser,
    })
    .as('newUser')
    cy.get('@newUser')
    .then(response => {
      expect(response.status).to.be.equal(201)
      expect(response.body).to.have.keys(['id', 'name', 'email', 'gender', 'status'])
      cy.wrap(response.body)
      .should('include', {
        'name': 'Ondatra Zbyshek',
        'email': 'compass@mail.com',
        'gender': 'male',
        'status': 'active'
      })
      userId = response.body.id
    })
  })
  it('should perform GET request and check the created user appeared in the database', () => {
    cy.request({
      method: 'GET',
      url: Cypress.env('urlGoRestApi'),
      qs: {name: newUser.name}
    })
    .as('newUser')
    cy.get('@newUser')
    .then(response => {
      expect(response.status).to.be.equal(200)
    })
  })
  it('should successfully preform PATCH request to modify the created user', () => {
    cy.request({
      method: 'PATCH',
      url: `${Cypress.env('urlGoRestApi')}${userId}`,
      auth: {
        bearer: Cypress.env('GoRestApiToken')
      },       
      body: patchedUser
    })
    .as('patchedUser')
    cy.get('@patchedUser')
    .then(response => {
      expect(response.status).to.be.equal(200)
      cy.wrap(response.body)
      .should('include', {
        'name': 'Zbyl Onder',
        'email': 'ontime@mail.com',
        'gender': 'female',
        'status': 'inactive'
      })
    })
  })
  it('should perform GET request and check the updated user appeared in the database', () => {
    cy.request({
      method: 'GET',
      url: Cypress.env('urlGoRestApi'),
      qs: {name: patchedUser.name}
    })
    .as('patchedUser')
    cy.get('@patchedUser')
    .then(response => {
      expect(response.status).to.be.equal(200)
    })
  })
  it('should successfully preform DELETE request to delete the created user', () => {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('urlGoRestApi')}${userId}`,
      auth: {
        bearer: Cypress.env('GoRestApiToken')
      },       
      failOnStatusCode: false,
    })
    .as('deletedUser')
    cy.get('@deletedUser')
    .then(response => {
      expect(response.status).to.be.equal(204)
    })
  })
  it('should perform GET request and check the is not present in the database', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('urlGoRestApi')}${userId}`,
      failOnStatusCode: false,
    })
    .as('deletedUser')
    cy.get('@deletedUser')
    .then(response => {
      expect(response.status).to.be.equal(404)
      cy.wrap(response.body)
      .should('deep.include', {
        "message": "Resource not found"
    })    
    })
  })
})