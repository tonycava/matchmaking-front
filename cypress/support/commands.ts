/// <reference types="cypress" />
Cypress.Commands.add("register", () => {
    const sharedSecret = Cypress.env('test');
    cy.log(sharedSecret);
    console.log(sharedSecret);
    if (sharedSecret) {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:8090/auth/truncate',
        });
    }
    cy.request({
        method: 'POST',
        url: 'http://localhost:8090/auth/register',
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