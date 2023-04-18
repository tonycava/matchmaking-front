/// <reference types="cypress" />

describe('main spec', () => {
    beforeEach(() => {
        cy.register()
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

    it('should have a profile button', () => {
        cy.get('button[id="profileButton"]').click().then(() => {
            cy.visit('/profile');
        });
    });

    it('should send a message', () => {
        cy.wait(1000);
        cy.get('input[name=message]').type('Hello World', { delay: 100, timeout: 1000 });
        cy.get("button[id='messageButton']").click();
        cy.get('li').should('contain', 'Hello World');
    });

    it('should join the waiting room', () => {
        cy.get("button[id='waitingButton']").click().then(() => {
            cy.visit('/waiting');
        });
    });
})