const { func } = require("prop-types")

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user={
      username:'test1',
      name:'xhp1',
      password:'xhp1'
    }
    cy.request('POST','http://localhost:3001/api/users/',user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('login').click()
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.login({username:'test1',password:'xhp1'})
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('test1')
      cy.get('#password').type('x')
      cy.get('#login').click()
      cy.get('#notification')
      .should('contain','username or password is wrong')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  
  
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username:'test1',password:'xhp1'})
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('title')
      cy.get('#author').type('author')
      cy.get('#url').type('url')
      cy.get('#submitBlog').click()
      cy.contains('a new blog title by author')
    })
    describe('After create blogs',function() {
      beforeEach(function() {
        cy.createBlog({
          title:'title',
          author:'author',
          url:'url',
          likes:0
        })
      })
  
      it('like a blog', function(){
        cy.contains('title author')
        .contains('view')
        .click()
        cy.get('button#like')
        .click()
        cy.contains('like title by author')
        
      })
  
      it('delete a blog',function(){
        cy.contains('title author')
        .contains('view')
        .click()
        cy.contains('remove').click()
        cy.contains('delete successfully')
      })
    })
  
  
    describe('multiple blogs',function(){
      beforeEach(function() {
        cy.createBlog({
          title:'title1',
          author:'author1',
          url:'url',
          likes:1
        })
        cy.createBlog({
          title:'title2',
          author:'author2',
          url:'url',
          likes:3
        })
        cy.createBlog({
          title:'title3',
          author:'author3',
          url:'url',
          likes:2
        })
      })
      it('order blogs',function(){
  
        cy.contains('title1 author1')
        .contains('view')
        .click()
        cy.contains('title2 author2')
        .contains('view')
        .click()
        cy.contains('title3 author3')
        .contains('view')
        .click()
        cy.get('div#likes')
        .then(divs=>{
          cy.wrap(divs[0]).should('contain','likes:3')
          cy.wrap(divs[1]).should('contain','likes:2')
          cy.wrap(divs[2]).should('contain','likes:1')
        })

      })
    })
  
  })



})