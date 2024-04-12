describe('adding elements', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/TodosAppNext/')
  })

  it('should allow adding a new todo(pressing enter)', () => {
    const todoText = 'Buy groceries'
    const todoText2 = 'Buy apples'

    cy.get('[data-cy="text-field"]').type(todoText)
    cy.get('[data-cy="text-field"]').type('{enter}')
    cy.get('[data-cy="text-field"]').type(todoText2)
    cy.get('[data-cy="text-field"]').type('{enter}')

    cy.contains('[data-cy="todo-item"]', todoText).should('exist')
    cy.contains('[data-cy="todo-item"]', todoText2).should('exist')

    cy.get('[data-cy="todo-item"]').should('have.length', 2);
    
    cy.get('[data-cy="text-field"]').should('have.value', '');
  })

  it('should allow adding a new todo(pressing enter)', () => {
    const todoText = 'Buy groceries'
    const todoText2 = 'Buy apples'

    cy.get('[data-cy="text-field"]').type(todoText)
    cy.get('[data-cy="text-field"]').type('{enter}')

    cy.get('[data-cy="button"]').click()

    cy.get('[data-cy="text-field"]').type(todoText2)
    cy.get('[data-cy="text-field"]').type('{enter}')

    cy.get('[data-cy="button"]').click()

    cy.get('[data-cy="todo-item"]').should('have.length', 2);
    
    cy.get('[data-cy="text-field"]').should('have.value', '');
  })
})