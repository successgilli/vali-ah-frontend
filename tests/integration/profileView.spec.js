describe('Update profile', () => {
  beforeEach(() => {
    cy.login();
  });
  describe('View profile', () => {
    it('loads successfully', async () => {
      cy.visit('/profile/view');
      cy.get('#userName').should('contain', 'ibnjoy joy');
      cy.get('#bio p').should('empty');
      cy.get('#profileImg')
        .should('have.attr', 'src')
        .should('include', '243699af2d42584116d5b5799dbaece0.svg');
    });
  });
});
