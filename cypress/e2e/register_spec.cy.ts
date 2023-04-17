/// <reference types="cypress" />
describe('register spec', () => {
    beforeEach(() => {
        cy.visit('/register');
        cy.wait(1000);
    });

    it('should display the register page', () => {
        cy.get('span').should('contain', 'Register');
    });

    it('should links to the login',() => {
        cy.contains('Login !').should('have.attr', 'href', '/login');
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
})