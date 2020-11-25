describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/testing/user')
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('hk7math')
      cy.get('#password').type('12345678')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#blog-button').click()
      cy.get('#blog-title').type('blog-title')
      cy.get('#blog-author').type('blog-author')
      cy.get('#blog-url').type('https://blog-url.com')
      cy.get('#blog-create').click()
      cy.get('.blog').contains('blog-title blog-author')
    })

    describe('When a blog exists', function() {
      beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/blog')
      })

      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.get('button').contains('like').click()
        cy.contains('likes 1')
      })
    })
  })
})