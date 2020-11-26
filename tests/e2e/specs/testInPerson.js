describe('InPerson Orders Test', () => {

  it('visit inPersonOrder page', () => {
    cy.visit('/login')
    cy.get('[id="testIdUsername"]').type('09100000000').blur()
    cy.get('[id="testIdPassword"]').type('123456').blur()
    cy.get('button').click()
    cy.get('[id="testIdInPerson"]').click()
    cy.get('[id="testIdDetailsInPerson-8"]').click()
    cy.get('[id="testIdDetailsInPersonLines"]').click()

  })

})
