describe('open api url and test', () => {
    it('open api url and check response status code', () => {
        cy.request('http://localhost:3000/posts').as('todoRequest').its('body').should('have.length', 7);
        cy.get('@todoRequest').then(response => {
            expect(response.status).to.be.equal(200);
            assert.isArray(response.body, 'Todos response is an array')
        });
    });
    it('Check post method status code', () => {
        cy.request('POST', 'http://localhost:3000/posts', {title: "eight", author: "Val"}).as('todoRequest');
        cy.get('@todoRequest').then(response => {
           expect(response.status).to.eq(201);
           cy.wrap(response.body).should('deep.include', {
            id: 8, 
            title: "eight", 
            author: "Val"
           });
        });
    });
    it('Check delete method status code', () => {
        cy.request('DELETE', `http://localhost:3000/posts/8`).as('todoRequest');
        cy.get('@todoRequest').then(response => {
            expect(response.status).to.eq(200);
            cy.wrap(response.body).should('not.include', {
                id: 8, 
                title: "eight", 
                author: "Val"
               });
            });
        });
    it('open api url and check response status code', () => {
        cy.request('http://localhost:3000/posts')
        .as('todoRequest')
        .its('body')
        .should('have.length', 7);
    });
});