describe('Login Test', () => {
  it('Successfully logs in to the internet', () => {
    cy.visit('https://the-internet.herokuapp.com/login')
    cy.get('#username').type('tomsmith')
    cy.get('#password').type('SuperSecretPassword!')
    cy.get('button[type="submit"]').click()
    cy.get('#flash').should('contain', 'You logged into a secure area!')
    cy.get('h2').should('contain', 'Secure Area')
  })
})