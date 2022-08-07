describe('Opens api url and test get and post methods', () => {
    let todoItem = {
        userId: '11',
        id: 201,
        title: 'My title',
        completed: true,
    };
    it('Opens api url and check response status code', () => {
        cy.request('https://jsonplaceholder.typicode.com/todos').as('todoRequest').its('body').should('have.length', 200);
        cy.get('@todoRequest').then(response => {
            expect(response.status).to.be.equal(200);
            assert.isArray(response.body, 'Todos response is an array')
        });
    });
    it('Check get method status code', () => {
        cy.request('GET', 'https://jsonplaceholder.typicode.com/todos', { userId: "1", title: 'delectus aut autem'}).as('todoRequest');
        cy.get('@todoRequest').then(response => {
           expect(response.status).to.eq(200)
        });
    });
    it('Check post method status code', () => {
        cy.request('POST', 'https://jsonplaceholder.typicode.com/todos', { userId: "11", title: 'My title', completed: true}).as('todoRequest');
        cy.get('@todoRequest').then(response => {
           expect(response.status).to.eq(201);
           cy.wrap(response.body).should('deep.include', {
               userId: '11',
               id: 201,
               title: 'My title',
               completed: true,
           });
        });
    });
});