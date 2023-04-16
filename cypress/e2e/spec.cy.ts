const BASE_URL = `http://localhost:${Cypress.env('PORT') ?? 11001}`;

describe('template spec', () => {
	it('Is open', () => {
		cy.visit(BASE_URL);
	});
});

describe('contains username', () => {
	it('Can type in username field', () => {
		cy.visit(BASE_URL);
		cy.get('input[name=username]').type('test');
		cy.get('input[name=username]').should('have.value', 'test');
	});
});

describe('contains login button', () => {
	it('can click', () => {
		cy.visit(BASE_URL);
		cy.contains('Login').click();
	});
});

describe('new URL is the expected URL', () => {
	it('does redirect ?', () => {
		cy.visit(BASE_URL);
		cy.contains('Login').click();
		cy.url().should('include', '/');
	});
});

//
