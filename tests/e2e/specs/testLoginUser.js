// https://docs.cypress.io/api/introduction/api.html

describe('Login User And SaleOrder Test', () => {

  it('visit login page', () => {
    cy.visit('/login')
    cy.get('[id="testIdUsername"]').type('09100000000').blur()
    cy.get('[id="testIdPassword"]').type('123456').blur()
    cy.get('button').click()
  })

})
