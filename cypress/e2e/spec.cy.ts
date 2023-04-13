describe('template spec', () => {
	it('passes', () => {
		cy.visit('http://localhost:11001');
	});
});

describe('contains username', () => {
	it('passes', () => {
		cy.visit('http://localhost:11001/login');
		cy.get('input[name=username]').type('test');
		cy.get('input[name=username]').should('have.value', 'test');
	});
});

describe('contains login button', () => {
	it('passes', () => {
		cy.visit('http://localhost:11001/login');
		cy.contains('Login').click();
	});
});

describe('new URL is the expected URL', () => {
	it('passes', () => {
		cy.visit('http://localhost:11001/login');
		cy.contains('Login').click();
		cy.url().should('include', '/');
	});
});

//
