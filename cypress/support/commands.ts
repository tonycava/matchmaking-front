/// <reference types="cypress" />
Cypress.Commands.add("login", () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:11002/auth/login',
        body: {
            username: 'escaffre.lucas2003@gmail.com',
            password: 'Root1234!'
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI1YzEwZTk0LTc4YmQtNGQ1NC1iYTg0LTg0MzgyNzFiMDFiYiIsInVzZXJuYW1lIjoibTRjaHQiLCJjcmVhdGVkQXQiOiIyMDIzLTAzLTIyVDEyOjQ4OjM3LjU1OVoiLCJpYXQiOjE2Nzk0ODkzMTcsImV4cCI6MTY4MDA5NDExN30.4E444nwD-ZDO35gDUwoNoGuagmAoztLHAJc6yPDRvsg'
        }
    }).then((response) => {
        cy.setCookie('jwt_token', response.body.data.token);
    });
});

Cypress.config('defaultCommandTimeout', 10000);