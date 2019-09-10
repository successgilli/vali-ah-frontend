const loginUser = () => new Promise((resolve) => {
  cy.request({
    method: 'POST',
    url: 'https://vali-1kbideas-staging.herokuapp.com/api/v1/auth/signin',
    body: {
      password: 'dike408Q!',
      email: 'gillrs@gmail.com',
    },
  }).then(({ body: { data } }) => {
    resolve(data.token);
  });
});

describe('View profile', () => {
  it('loads successfully', async () => {
    window.localStorage.setItem('token', await loginUser());
    cy.log(window.localStorage.getItem('token'));
    cy.visit('/profile/view');
    cy.get('#userName').should('contain', 'peter wills');
    cy.get('#bio p').should('empty');
    cy.get('#profileImg')
      .should('have.attr', 'src')
      .should('include', '243699af2d42584116d5b5799dbaece0.svg');
  });
});
