/// <reference types="cypress" />
Cypress.Commands.add("register", () => {
    const sharedSecret = Cypress.env('test');
    if (sharedSecret) {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:11002/auth/truncate',
        });
    }
    cy.request({
        method: 'POST',
        url: 'http://localhost:11002/auth/register', //8090 or 11002
        body: {
            username: 'test3',
            password: 'Root1234!'
        },
        headers: {'Content-Type': 'application/json'}
    }).then((response) => {
        cy.setCookie('jwt_token', JSON.stringify(response.body.data.token));
    });
});

Cypress.config('defaultCommandTimeout', 10000);