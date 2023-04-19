/// <reference types="cypress" />
Cypress.Commands.add("register", () => {
    const sharedSecret = Cypress.env('test');
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

Cypress.Commands.add("login", () => {
    cy.log(`cookie : ${cy.getCookie('jwt_token')}`);
    cy.request({
        method: 'POST',
        url: 'http://localhost:8090/auth/login',
        body: {
            username: 'test3',
            password: 'Root1234!'
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${cy.getCookie('jwt_token')}`
        }
    }).then((response) => {
        cy.setCookie('jwt_token', JSON.stringify(response.body.data.token));
    });
});

Cypress.config('defaultCommandTimeout', 10000);