describe('Update profile', () => {
  beforeEach(() => {
    cy.login();
  });
  it('loads profile details successfully', () => {
    cy.visit('/profile/update');
    cy.get('.username').should('contain', 'ibnjoy  joy');
    cy.get('#bio').should('empty');
    cy.get('#profileImg')
      .should('have.attr', 'src')
      .should('include', '243699af2d42584116d5b5799dbaece0.svg');
  });

  it('check if a users details is updated', () => {
    cy.visit('/profile/update');
    cy.wait(20000);
    cy.get('input[name="firstName"]').clear().type('IBK');
    cy.get('input[name="lastName"]').clear().type('Joe');
    cy.get('input[name="userName"]').clear().type('Gil');
    cy.get('textarea[name="bio"]').clear().type('Inside life there is five alive');
    cy.get('#firstname').should('have.value', 'IBK');
    cy.get('#lastname').should('have.value', 'Joe');
    cy.get('#username').should('have.value', 'Gil');
    cy.get('#bio').should('contain', 'Inside life there is five alive');
    cy.get('button[type="submit"]').click();
  });
});
