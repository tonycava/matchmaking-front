/// <reference types="cypress" />

describe('template spec', () => {
    beforeEach(() => {
        cy.login()
        cy.getCookie('jwt_token')
        cy.visit('/');
    });

    it('should display the main page', () => {
        cy.visit('/');
    });

    it('should have a title', () => {
        cy.get('span').should('contain', 'Welcome to ALM-Matcher');
    });

    it('should have a logout button', () => {
        cy.get('button').should('contain', 'Logout');
    });

    it('should have a link to the profile', () => {
        cy.get('button').should('contain', 'Profile').click();
        cy.url().should('include', '/profile');
    });

})