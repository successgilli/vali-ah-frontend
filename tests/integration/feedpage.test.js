describe('feed page', () => {
  it('should visit the feed page and feed should be empty', () => {
    cy.server();
    cy.route('/api/v1/*', { data: [] }).as('getSub');
    cy.route('/api/v1/articles/feed', { data: [] }).as('getFeed');
    cy.visit('/feed');

    cy.get('.feed-card').should('have.length', 0);
    cy.get('.subscription-card').should('have.length', 0);
    cy.get('.feed-page').should('have.length', 1);
    cy.get('.share-story__text').should('have.length', 1);
    cy.get('.feed-page__feed').should('have.text', 'Feed');
    cy.get('.feed-page__suggested-stories').should('have.text', 'Suggested Stories');
    cy.get('.feed-page__no-feed').should('have.text', 'You have no feed because you are currently not following any author');
  });

  it('should link to articles create page when the share component is clicked', () => {
    cy.server();
    cy.route('/api/v1/*', { data: [] }).as('getSub');
    cy.route('/api/v1/articles/feed', { data: [] }).as('getFeed');
    cy.visit('/feed');

    cy.get('.share-story__text').should('have.length', 1);
    cy.get('.share-story__text').click();
    cy.url().should('include', '/createArticles');
  });

  it('should link to the article the user clicked', () => {
    cy.server();
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/v1/*',
      status: 200,
      response: {
        data: [
          {
            title: 'benny',
            updatedAt: '2019-09-12T08:58:50.855Z',
            tags: ['production'],
            author: {
              avatarUrl: null
            },
            slug: 's-l-u-g-1',
            summary: 'life is hard testing'
          },
        ]
      },
    }).as('subArticles');
    cy.route('/api/v1/articles/feed', { data: [] }).as('getFeed');
    cy.visit('/feed');

    cy.get('.subscription-card__title').click();
    cy.url().should('include', '/articles/s-l-u-g-1');
  });

  it('should remove the \'no articles found\' message and display feedcards and subscribed articles', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/v1/*',
      status: 200,
      response: {
        data: [
          {
            title: 'benny',
            updatedAt: '2019-09-12T08:58:50.855Z',
            tags: ['production'],
            author: {
              avatarUrl: null
            },
            slug: 's-l-u-g-1',
            summary: 'life is hard testing'
          },
        ]
      },
    }).as('subArticles');
    cy.route({
      method: 'GET',
      url: '/api/v1/articles/feed',
      status: 200,
      response: {
        data: [
          {
            title: 'benny',
            updatedAt: '2019-09-12T08:58:50.855Z',
            tags: ['production'],
            author: {
              avatarUrl: 'string'
            },
            slug: 's-l-u-g-1',
          }
        ]
      },
    }).as('feedArticles');
    cy.visit('/feed');
    cy.wait('@subArticles');

    cy.get('.feed-card').should('have.length', 1);
    cy.get('.subscription-card').should('have.length', 1);
    cy.get('.feed-page__no-feed').should('have.length', 0);
  });
});
