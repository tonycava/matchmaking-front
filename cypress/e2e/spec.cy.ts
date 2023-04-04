describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:11001/login')
  })
})

describe('contains username', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:11001/login')
    cy.get('input[name=username]').type('test')
  })
})

describe('contains password', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.111001/login')
    cy.get('input[name=password]').type('test')
  })
})

describe('contains login button', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:11001/login')
    cy.contains('Login').click()
  })
})

describe('the new user have cookies', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:11001/login')
    cy.contains('Login').click()
    cy.getCookie('jwt_token').should('exist')
  })
})

describe('new URL is the expected URL', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:11001/login')
    cy.contains('Login').click()
    cy.url().should('include', '/')
  })
})
