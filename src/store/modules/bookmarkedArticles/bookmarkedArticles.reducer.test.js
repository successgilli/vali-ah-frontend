import articles from 'fixtures/bookmarkedArticles';

import defaultReducer, {
  getBookmarkedArticlesRequest,
  getBookmarkedArticlesSuccess,
  getBookmarkedArticlesFailure,
} from './index';

describe('Bookmark reducer', () => {
  const initialState = {
    articles: [],
    loading: false,
    error: null
  };

  it('should change the loading property of the initial state', () => {
    const action = getBookmarkedArticlesRequest();
    const newState = defaultReducer(initialState, action);

    expect(newState).toMatchObject({ ...initialState, loading: true });
  });

  it('should add the payload to the articles array of the state', () => {
    const action = getBookmarkedArticlesSuccess(articles);
    const newState = defaultReducer(initialState, action);

    expect(newState).toMatchObject({ ...initialState, articles, loading: false });
  });

  it('should update error value in store', () => {
    const action = getBookmarkedArticlesFailure('error');
    const newState = defaultReducer(initialState, action);

    expect(newState).toMatchObject({ ...initialState, articles: [], error: 'error' });
  });
});
