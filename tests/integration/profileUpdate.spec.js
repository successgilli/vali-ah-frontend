describe('Update profile', () => {
  beforeEach(() => {
    cy.login();
  });
  it('loads profile details successfully', () => {
    cy.visit('/profile/update');
    cy.get('p.userName').should('contain', 'peter  wills');
    cy.get('#bio').should('empty');
    cy.get('#profileImg')
      .should('have.attr', 'src')
      .should('include', '243699af2d42584116d5b5799dbaece0.svg');
  });
});
