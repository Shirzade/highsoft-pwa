// https://docs.cypress.io/api/introduction/api.html

describe('Import Product Test', () => {

  it('visit importProduct page', () => {
    cy.visit('/login')
    cy.get('[id="testIdUsername"]').type('09100000000').blur()
    cy.get('[id="testIdPassword"]').type('123456').blur()
    cy.get('button').click()
    cy.get('[id="testIdReportSale"]').click()
    cy.get('[id="testIdImportProduct"]').click()
    cy.get('[id="testIdImportProductPage"]').type('شلوار زارا').blur()
    cy.get('[id="testIdSearchButton"]').click()
    cy.get('[id="testIdImportButton"]').click()
  })

})
