Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: 'https://vali-1kbideas-staging.herokuapp.com/api/v1/auth/signin',
    body: {
      password: 'lovem!588',
      email: 'myjoy@gmail.com',
    },
  }).then(({ body: { data } }) => {
    window.localStorage.setItem('token', data.token);
  });
});
