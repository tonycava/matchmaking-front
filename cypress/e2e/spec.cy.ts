// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('http://localhost:11001/login')
//   })
// })
//
// describe('contains username', () => {
//   it('passes', () => {
//     cy.visit('http://localhost:11001/login')
//     cy.get('input[name=username]').type('test')
//   })
// })
//
// describe('contains password', () => {
//   it('passes', () => {
//     cy.visit('http://localhost:11001/login')
//     cy.get('input[name=password]').type('test')
//   })
// })
//
// describe('contains login button', () => {
//   it('passes', () => {
//     cy.visit('http://localhost:11001/login')
//     cy.contains('Login').click()
//   })
// })
//
// describe('new URL is the expected URL', () => {
//   it('passes', () => {
//     cy.visit('http://localhost:11001/login')
//     cy.contains('Login').click()
//     cy.url().should('include', '/')
//   })
// })

describe('My First Test', () => {
  it('Gets, types and asserts', () => {
    cy.visit('https://example.cypress.io')

    cy.contains('type').click()

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/commands/actions')

    // Get an input, type into it
    cy.get('.action-email').type('fake@email.com')

    //  Verify that the value has been updated
    cy.get('.action-email').should('have.value', 'fake@email.com')
  })
})