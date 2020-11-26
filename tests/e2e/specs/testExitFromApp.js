describe('Exit From  App', () => {

  it('exit from application', () => {
    cy.visit('/login')
    cy.get('[id="testIdUsername"]').type('09100000000').blur()
    cy.get('[id="testIdPassword"]').type('123456').blur()
    cy.get('button').click()

  })

})
