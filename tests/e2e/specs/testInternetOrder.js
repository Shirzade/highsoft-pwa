describe('Internet Orders Test', () => {

  it('visit internetOrder page', () => {
    cy.visit('/login')
    cy.get('[id="testIdUsername"]').type('09100000000').blur()
    cy.get('[id="testIdPassword"]').type('123456').blur()
    cy.get('button').click()
    cy.get('[id="testIdInterOrders"]').click()
    cy.get('[id="testIdInterOrdersNewOrders"]').click()
    cy.get('[id="testIdInterOrdersEdit"]').click()
    cy.get('[id="testIdInterOrdersExpressDelivery"]').click()
    cy.get('[id="testIdInterOrdersCustomerDelivery"]').click()
    cy.get('[id="testIdDetailsInternet-5"]').click()
  })

})
