/// <reference types="cypress" />
Cypress.Commands.add('register', () => {
	cy.request({
		method: 'POST',
		url: 'http://localhost:8090/auth/register',
		body: {
			username: 'MyAtoMixX',
			password: 'Root1234!'
		}
	}).then((response) => {
		cy.setCookie('jwt_token', response.body.data.token);
	});
});

Cypress.config('defaultCommandTimeout', 10000);
