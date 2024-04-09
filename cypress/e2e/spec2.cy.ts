describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')

    cy.get('.parent').children('.child').last().should('contain', 'Child 3');
  
    // Verify that all child elements have a specific class
    cy.get('.parent').children('.child').each(($child) => {
      cy.wrap($child).should('have.class', 'child');
    });

    cy.get('.parent')
      .children('.child')
      .first()
      .click()
      .next()
      .type('Im Leo');
  })
})