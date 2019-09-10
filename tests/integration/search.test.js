describe('App test', () => {
  it('loads successfully', () => {
    cy.visit('/search');
    cy.get('input[type="text"]').should('exist');
  });
  it('get results', () => {
    cy.visit('/search');
    cy.get('input[type="text"]').type('Health {enter}');
    cy.get('.search-container').should('exist');
  });
});
