const PORT: number = Cypress.env('PORT') || 11001;

describe('template spec', () => {
	it('passes', () => {
		cy.visit(`http://localhost:${PORT}`);
	});
});

describe('contains username', () => {
	it('passes', () => {
		cy.visit(`http://localhost:${PORT}/login`);
		cy.get('input[name=username]').type('test', { delay: 50 });
		cy.get('input[name=username]').should('have.value', 'test');
	});
});

describe('contains login button', () => {
	it('passes', () => {
		cy.visit(`http://localhost:${PORT}/login`);
		cy.contains('Login').click();
	});
});

describe('new URL is the expected URL', () => {
	it('passes', () => {
		cy.visit(`http://localhost:${PORT}/login`);
		cy.contains('Login').click();
		cy.url().should('include', '/');
	});
});

//
