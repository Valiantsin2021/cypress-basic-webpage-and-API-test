describe('open api url and test', () => {
    let todoItem = {
        userId: '11',
        id: 201,
        title: 'My title',
        completed: true,
    };
    it('open api url and check response status code', () => {
        cy.request('https://jsonplaceholder.typicode.com/todos').as('todoRequest').its('body').should('have.length', 200);
        cy.get('@todoRequest').then(response => {
            expect(response.status).to.be.equal(200);
            assert.isArray(response.body, 'Todos response is an array')
        });
    });
    it('Check post method status code', () => {
        cy.request('POST', 'https://jsonplaceholder.typicode.com/todos', { userId: "11", title: 'My title', completed: true}).as('todoRequest');
       // adds new Todo item by defining Todo name
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