describe('Open Simple Book api url and test http requests GET, POST, PATCH and DELETE', () => {
    const bookId = 5;
    const authToken = 'beb97f238459e7d07e54f51c9fd2c847c38706e05fab484d20a79adb09efe302';
    let orderId;
    it('Open Simple Book api url and check response status code', () => {
        cy.request('https://simple-books-api.glitch.me/status')
        .as('request')
        cy.get('@request')
        .then(response => {
            expect(response.status).to.be.equal(200);
        });
    });
    it('Check the authentification is already made and is impossible to do again with the same email', () => {
        cy.request({
            method:'POST', 
            url:'https://simple-books-api.glitch.me/api-clients/',
            failOnStatusCode: false,
            body: { clientName: "ondra", clientEmail: "me@mail.com"}
        }).as('authRequest')
        cy.get('@authRequest')
        .then(response => {
            expect(response.status).to.be.equal(409);
            cy.wrap(response.body).should('deep.include', {
                error: 'API client already registered. Try a different email.'
            });
        });
    });
    it('Get list of all books from the api', () => {
        cy.request('https://simple-books-api.glitch.me/books')
        .as('booksRequest')
        cy.get('@booksRequest')
        .then(response => {
            expect(response.status).to.be.equal(200);
            assert.isArray(response.body)
            expect(response.body).have.length(6);
        });
    });
    it('Filter the list of books from the api to non-fiction', () => {
        cy.request({
            method:'GET', 
            url: 'https://simple-books-api.glitch.me/books',
            qs: {type: 'non-fiction'}
        })
        .as('nonFiction')
        cy.get('@nonFiction')
        .then(response => {
            expect(response.status).to.be.equal(200);
            assert.isArray(response.body)
            expect(response.body).have.length(2);
            cy.wrap(response.body[0]).should('deep.include', {
                id: 2,
                name: "Just as I Am",
                type: "non-fiction",
                available: false
            });
            cy.wrap(response.body[1]).should('contain', {
                available: true
            });
        });
    });
    it('Find one book with id "5" and check it is available', () => {
        cy.request({
            method:'GET', 
            url:`https://simple-books-api.glitch.me/books/${bookId}`,
        }).as('singleBook')
        cy.get('@singleBook')
        .then(response => {
            expect(response.status).to.be.equal(200);
            cy.wrap(response.body).should('deep.include', {
                "id": 5,
                "name": "Untamed",
                "author": "Glennon Doyle",
                "type": "non-fiction",
                "price": 15.5,
                "current-stock": 20,
                "available": true
            });
        });
    });
    it('Order the book with id "5" and check it order number', () => {
        cy.request({
            method:'POST', 
            url:`https://simple-books-api.glitch.me/orders`,
            auth: {
                bearer: authToken
              },       
            body: {
                bookId: bookId,
                clientName: "Valentin"
            }
        }).as('order')
        cy.get('@order')
        .then(response => {
            expect(response.status).to.be.equal(201);
            expect(response.body.created).to.be.true
            expect(response.body).to.include.key('orderId')
            orderId = response.body.orderId
        });
    });
    it(`Check the order: ${orderId} is existing`, () => {
        cy.request({
            method:'GET', 
            url:`https://simple-books-api.glitch.me/orders`,
            auth: {
                bearer: authToken
              }
        }).as('order')
        cy.get('@order')
        .then(response => {
            expect(response.status).to.be.equal(200);
            expect(response.body).to.have.length(1)
            expect(response.body[0]).to.include.key('id', 'quantity')
            expect(response.body[0].id).to.equal(orderId)
            expect(response.body[0].quantity).to.equal(1)
        });
    });
    it(`Change customers name in order: ${orderId} using PATCH method and check the orders customer name is changed`, () => {
        cy.request({
            method:'PATCH', 
            url:`https://simple-books-api.glitch.me/orders/${orderId}`,
            auth: {
                bearer: authToken
              },
            body: {
                customerName: 'Val'
            }
        }).as('order')
        cy.get('@order')
        .then(response => {
            expect(response.status).to.be.equal(204);
        });
        cy.request({
            method:'GET', 
            url:`https://simple-books-api.glitch.me/orders`,
            auth: {
                bearer: authToken
              }
        }).as('order')
        cy.get('@order')
        .then(response => {
            expect(response.status).to.be.equal(200);
            expect(response.body[0]).to.include.key('customerName');
            expect(response.body[0].customerName).to.eql('Val');
        });
    });
    it(`Delete the order: ${orderId} and check there are no active orders`, () => {
        cy.request({
            method:'DELETE', 
            url:`https://simple-books-api.glitch.me/orders/${orderId}`,
            auth: {
                bearer: authToken
              }
        }).as('delOrder')
        cy.get('@delOrder')
        .then(response => {
            expect(response.status).to.be.equal(204);
        });
        cy.request({
            method:'GET', 
            url:`https://simple-books-api.glitch.me/orders`,
            auth: {
                bearer: authToken
              }
        }).as('order')
        cy.get('@order')
        .then(response => {
            expect(response.status).to.be.equal(200);
            expect(response.body).to.have.length(0);
        });
    });
});