describe('Signup test', () => {
  it('should load home', () => {
    cy.visit('/');
    cy.get('#management').click();
    cy.get('#signup').click();
  });

  it('should test for invalid input', () => {
    cy.get('input[name="firstName"]').type('v');
    cy.get('input[name="lastName"]').type('vali@');
    cy.get('input[name="userName"]').type('w');
    cy.get('input[name="email"]').type('w');
    cy.get('input[name="password"]').type('w');
    cy.get('input[name="confirmPassword"]').type('we');
  });

  it('should test for valid input', () => {
    cy.get('input[name="firstName"]').clear().type('Jonathan');
    cy.get('input[name="lastName"]').clear().type('Williams');
    cy.get('input[name="userName"]').clear().type('Nathan');
    cy.get('input[name="email"]').clear().type('nathan@gmail.com');
    cy.get('input[name="password"]').clear().type('password');
    cy.get('input[name="confirmPassword"]').clear().type('password');
  });
});
