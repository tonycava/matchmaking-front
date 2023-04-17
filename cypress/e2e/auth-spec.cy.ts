/// <reference types="cypress" />
describe('Register', () => {
	let currentUser;

	beforeEach(() => {
		// reset and seed the database prior to every test
		cy.exec('cd .. && make start-db-only');

		// seed a user in the DB that we can control from our tests
		// assuming it generates a random password for us
		cy.request('POST', 'http://localhost:11002/auth/register', { username: 'm4cht', password: 'Passw0rd' })
			.its('body')
			.as('currentUser');
	});

	it('sets auth cookie when registering in via form submission', () => {
		cy.get('@currentUser').then((user) => {
			currentUser = user;

			cy.visit('/register')

			cy.get('input[name=username]').type(currentUser.username)

			// {enter} causes the form to submit
			cy.get('input[name=password]').type(`${currentUser.password}{enter}`)

			// we should be redirected to /dashboard
			cy.url().should('include', '/')

			// our auth cookie should be present
			cy.getCookie('your-session-cookie').should('exist')

			// UI should reflect this user being logged in
			cy.get('h1').should('contain', 'm4cht')
		});
	});
});

describe('The Login Page', () => {
	beforeEach(() => {
		// reset and seed the database prior to every test
		cy.exec('cd .. && make start-db-only')

		// seed a user in the DB that we can control from our tests
		// assuming it generates a random password for us
		cy.request('POST', 'http://localhost:11002/auth/login', { username: 'm4cht', password: 'Passw0rd' })
			.its('body')
			.as('currentUser')
	})

	it('sets auth cookie when logging in via form submission',  () => {
		// destructuring assignment of the this.currentUser object
		const { username, password } = this.currentUser

		cy.visit('/login')

		cy.get('input[name=username]').type(username)

		// {enter} causes the form to submit
		cy.get('input[name=password]').type(`${password}{enter}`)

		// we should be redirected to /dashboard
		cy.url().should('include', '/')

		// our auth cookie should be present
		cy.getCookie('your-session-cookie').should('exist')

		// UI should reflect this user being logged in
		cy.get('h1').should('contain', 'm4cht')
	})
})