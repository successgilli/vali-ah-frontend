describe('Password reset page', () => {
  it('should give error on invalid email', () => {
    cy.visit('/password-reset');
    cy.get('input[name="email"]').type('invalidemail');
    cy.get('.button').click();
    cy.get('.form--error').should('contain', 'Enter a valid email');
  });

  it('should give notification on valid existing email', () => {
    cy.server();
    cy.route({
      method: 'POST',
      url: '**/reset_password',
      status: 200,
      response: {
        message: 'Password reset email sent'
      },
      delay: 50
    });

    cy.visit('/password-reset');

    cy.get('input[name="email"]').type('validemail@mail.com');
    cy.get('.button').click();
    cy.get('.form--error').should('not.contain', 'Enter a valid email');
    cy.get('.message').should('contain', 'Password reset email sent');
  });

  it('should give notification on valid non existing email', () => {
    cy.server();
    cy.route({
      method: 'POST',
      url: '**/reset_password',
      status: 404,
      response: {
        error: { message: 'Email doesnt exist' }
      },
      delay: 50
    });

    cy.visit('/password-reset');

    cy.get('input[name="email"]').type('validemail@mail.com');
    cy.get('.button').click();
    cy.get('.form--error').should('not.contain', 'Enter a valid email');
    cy.get('.message').should('contain', 'Email doesnt exist');
    cy.get('.error').should('exist');
  });
});

describe('Password update page', () => {
  it('should give error on empty password field', () => {
    cy.visit('/password-reset/userId');
    cy.get('.button').click();
    cy.get('.form--error').should('contain', 'Password should be between 8 and 15 characters');
  });

  it('should give error when password and confirmPassword isnt equal', () => {
    cy.visit('/password-reset/userId');
    cy.get('input[name="password"]').type('password');
    cy.get('input[name="confirmPassword"]').type('invalidpassword');
    cy.get('.button').click();
    cy.get('.form--error').should('contain', 'Password and confirm password should be equal');
  });

  it('should not give error when password and confirmPassword is equal', () => {
    cy.visit('/password-reset/userId');
    cy.get('input[name="password"]').type('password');
    cy.get('input[name="confirmPassword"]').type('password');
    cy.get('.button').click();
    cy.get('.form--error').should('not.contain', 'Password and confirm password should be equal');
  });

  it('should give notification on success', () => {
    cy.server();
    cy.route({
      method: 'PATCH',
      url: '**/update_password/**',
      status: 200,
      response: {
        message: 'Password reset successful'
      },
      delay: 50
    });

    cy.visit('/password-reset/userId');
    cy.get('input[name="password"]').type('password');
    cy.get('input[name="confirmPassword"]').type('password');
    cy.get('.button').click();
    cy.get('.message').should('contain', 'Password reset successful');
  });
});
