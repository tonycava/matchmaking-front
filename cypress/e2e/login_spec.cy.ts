/// <reference types="cypress" />
describe('login spec', () => {
	beforeEach(() => {
		cy.visit('/login');
		cy.wait(1000);
	});

	it('should display the login page', () => {
		cy.get('span').should('contain', 'Login');
	});

	it('should links to the register', () => {
		cy.contains('Register !').should('have.attr', 'href', '/register');
	});

	it('should display an error message when the form is submitted with invalid credentials', () => {
		cy.get('form').submit();
		cy.get('span').should('contain', 'Username is required');
	});

	it('should display an error message when the password is not submitted', () => {
		cy.get("input[name=username]").type('m4cht');
		cy.get('form').submit();
		cy.get('span').should('contain', 'Password is required');
	});

	it('should display an error when the user doesn\'t exist', () => {
		cy.get("input[name=username]").type('patrick', { delay: 100, timeout: 1000 });
		cy.get("input[name=password]").type('123456', { delay: 100, timeout: 1000});
		cy.get('form').submit();
		cy.get('span').should('contain', 'Invalid credentials');
	});

	it('should display an error when the password is invalid', () => {
		cy.get("input[name=username]").type('m4cht', { delay: 100, timeout: 1000 });
		cy.get("input[name=password]").type('123456', { delay: 100, timeout: 1000});
		cy.get('form').submit();
		cy.get('span').should('contain', 'Invalid credentials');
	});
});