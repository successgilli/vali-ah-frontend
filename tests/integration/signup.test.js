describe('Signup test', () => {
  it('should load signup', () => {
    cy.visit('/');
    cy.get('#signup').click();
  });

  it('should test for invalid input', () => {
    cy.visit('/');
    cy.get('#signup').click();
    cy.get('input[name="firstName"]').type('v');
    cy.get('input[name="lastName"]').type('vali@');
    cy.get('input[name="userName"]').type('w');
    cy.get('input[name="email"]').type('w');
    cy.get('input[name="password"]').type('w');
    cy.get('input[name="confirmPassword"]').type('we');
  });

  it('should test for valid input', () => {
    cy.visit('/');
    cy.get('#signup').click();
    cy.get('input[name="firstName"]').type('Jonathan');
    cy.get('input[name="lastName"]').type('Williams');
    cy.get('input[name="userName"]').type('Nathan');
    cy.get('input[name="email"]').type('nathan@gmail.com');
    cy.get('input[name="password"]').type('password');
    cy.get('input[name="confirmPassword"]').type('password');
  });
});
