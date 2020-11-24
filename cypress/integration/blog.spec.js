describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      "username": "hk7math",
      "name": "hk7math",
      "password": "12345678"
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('hk7math')
      cy.get('#password').type('12345678')
      cy.get('#login-button').click()

      cy.contains('hk7math logged in')

    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('hk7math')
      cy.get('#password').type('87654321')
      cy.get('#login-button').click()

      cy.contains('Request failed with status code 401')
      cy.get('#message').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})