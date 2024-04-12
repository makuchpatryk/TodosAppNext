describe('check if app is running', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/TodosAppNext/')
  })
})