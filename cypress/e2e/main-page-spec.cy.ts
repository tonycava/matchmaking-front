/// <reference types="cypress" />
 describe('Main Page - Title', () => {
	 beforeEach(() => {
		 cy.exec('cd .. && make start-dev')
	 })
 	it("Login into the application", () => {
 		cy.visit('/login')
 		cy.get('input[name="username"]').type('m4cht');
 		cy.get('input[name="password"]').type('password', { force: true });
 		cy.get('button[type="submit"]').click();
 	});
 	it('should have a title', () => {
 		cy.visit('/');
 		cy.get('h1').should('contain', 'Welcome to the main page');
 	});
 });

 describe('Main Page - Logout', () => {
	 beforeEach(() => {
		 cy.exec('cd .. && make start-dev')
	 })
 	it('should have a logout button', () => {
 		cy.visit('/');
 		cy.get('button').should('contain', 'Logout');
 		cy.get('button"]').click();
 		cy.url().should('include', '/login');
 	});
});