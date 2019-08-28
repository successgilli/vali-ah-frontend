describe('App test', () => {
  it('loads successfully', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'Welcome to 1kbIdeas');
  });
});
