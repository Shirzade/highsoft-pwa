describe('Main Menu And Header Test', () => {

  it('visit main Menu', () => {
    cy.visit('/login')
    cy.get('[id="testIdUsername"]').type('09100000000').blur()
    cy.get('[id="testIdPassword"]').type('123456').blur()
    cy.get('button').click()

  })

})
