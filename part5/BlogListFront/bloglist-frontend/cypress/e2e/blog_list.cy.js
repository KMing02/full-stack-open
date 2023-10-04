describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'kmkm',
      username: 'Keming',
      password: '2003'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Keming')
      cy.get('#password').type('2003')
      cy.get('#login-button').click()

      cy.contains('kmkm logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Kemin')
      cy.get('#password').type('200')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('Keming')
      cy.get('#password').type('2003')
      cy.get('#login-button').click()

      cy.contains('kmkm logged in')
    })

    it('A blog can be created', function() {
      cy.contains('create blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('km')
      cy.get('#url').type('http://localhost:5173/')
      cy.get('#createblog-button').click()

      cy.contains('a new blog test blog by km added')
      cy.contains('test blog - km')
    })

    describe('Users can like the blog', function() {
      beforeEach(function() {
        cy.contains('create blog').click()
        cy.get('#title').type('test blog')
        cy.get('#author').type('km')
        cy.get('#url').type('http://localhost:5173/')
        cy.get('#createblog-button').click()
  
        cy.contains('a new blog test blog by km added')
        cy.contains('test blog - km')
      })
      
      it('Users can like the blog', function() {
        cy.get('#view').click()
        cy.get('#like-button').click()
        
        cy.get('.like').contains('1')
      })

      it('user who created a blog can delete it', function() {
        cy.get('#view').click()
        cy.get('#remove').click()

        cy.contains('Blog test blog was successfully deleted')
      })
      
      describe('only the creator can see the delete button of a blog, not anyone else', function() {
        beforeEach(function() {
          const user = {
            name: 'kmkm',
            username: 'Keming02',
            password: '2003'
          }
          cy.request('POST', 'http://localhost:3003/api/users', user)

          cy.get('#logout').click()
          cy.get('#username').type('Keming')
          cy.get('#password').type('2003')
          cy.get('#login-button').click()

          cy.contains('kmkm logged in')
        })

        it('user who did not create the blog cannot see the delete button', function() {
          cy.get('#view').click()
          cy.get('#remove').should('not.exist')
        })
      })

      describe('blogs are ordered according to likes with the blog with the most likes being first', function() {
        beforeEach(function() {
          cy.contains('create blog').click()
          cy.get('#title').type('test blog22')
          cy.get('#author').type('km')
          cy.get('#url').type('http://localhost:5173/')
          cy.get('#createblog-button').click()
    
          cy.contains('a new blog test blog22 by km added')
          cy.contains('test blog22 - km')
        })

        it('the blogs are ranked by number of likes', function() {
          cy.contains('test blog22 - km').find('#view').click()
          cy.contains('test blog22 - km').parent().parent().find('#like-button').click()
          cy.contains('test blog22 - km').parent().parent().find('#like-button').click()
          cy.get('#blog').eq(0).should('contain', 'test blog22')

          cy.contains('test blog - km').find('#view').click()
          cy.contains('test blog - km').parent().parent().find('#like-button').click()
          cy.contains('test blog - km').parent().parent().find('#like-button').click()
          cy.contains('test blog - km').parent().parent().find('#like-button').click()
          cy.contains('test blog - km').parent().parent().find('#like-button').click()
          cy.get('#blog').eq(0).should('contain', 'test blog')

        })
      })
    })
  })
})