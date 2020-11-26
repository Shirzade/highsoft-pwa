describe('Need Shop Test', () => {

  it('visit needShop page', () => {
    cy.visit('/login')
    cy.get('[id="testIdUsername"]').type('09100000000').blur()
    cy.get('[id="testIdPassword"]').type('123456').blur()
    cy.get('button').click()
    cy.get('[id="testIdNeedShop"]').click()

  })

})
