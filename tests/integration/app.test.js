describe('App test', () => {
  it('loads successfully', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'The one-stop shop for all the self-help ideas you need');
  });
});
