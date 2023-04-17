describe('template spec', () => {
	it('passes', () => {
		cy.visit(`/`);
	});
});

describe('contains username', () => {
	it('passes', () => {
		cy.visit(`/login`);
		cy.get('input[name=username]').type('test', { delay: 50 });
		cy.get('input[name=username]').should('have.value', 'test');
	});
});

describe('contains login button', () => {
	it('passes', () => {
		cy.visit(`/login`);
		cy.contains('Login').click();
	});
});

describe('new URL is the expected URL', () => {
	it('passes', () => {
		cy.visit(`/login`);
		cy.contains('Login').click();
		cy.url().should('include', '/');
	});
});

//
