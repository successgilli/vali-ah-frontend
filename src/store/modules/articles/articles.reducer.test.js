import { createdArticle, articles } from 'fixtures/articles';
import defaultReducer, { createArticleSuccess, createArticleFailure } from './index';

describe('create article reducer', () => {
  const initialState = {
    createdArticle: {},
    error: null
  };

  it('should add created article to store on success', () => {
    const action = createArticleSuccess(createdArticle);
    const newState = defaultReducer(initialState, action);

    expect(newState).toMatchObject({ ...articles });
  });

  it('should update error value in store on create article failure', () => {
    const action = createArticleFailure('create article failed');
    const newState = defaultReducer(initialState, action);

    expect(newState).toMatchObject({ ...initialState, error: 'create article failed' });
  });
});
