// actions
import articleReducer, {
  requestFetchArticle,
  fetchArticle,
  handleFetchArticleError,
} from './index';

describe('Reducers', () => {
  it('should check if reducer is loading fetch', async () => {
    const initialState = {
      data: {},
      loading: false,
      error: {}
    };
    const newState = articleReducer(initialState, requestFetchArticle());
    expect(newState.data).toEqual({});
    expect(newState.loading).toEqual(true);
    expect(newState.error).toEqual({});
  });

  it('should check if reducer fetch the article', async () => {
    const initialState = {
      data: {},
      loading: false,
      error: {}
    };
    const payload = {
      article: 'fetched article',
    };
    const newState = articleReducer(initialState, fetchArticle(payload));
    expect(newState.data.article).toEqual('fetched article');
    expect(newState.error).toEqual({});
    expect(newState.loading).toEqual(false);
  });

  it('should check if reducer is getting an error while fetching an article', async () => {
    const initialState = {
      data: {},
      loading: false,
      error: {}
    };
    const payload = {
      error: 'This is an error'
    };
    const newState = articleReducer(initialState, handleFetchArticleError(payload));
    expect(newState.data).toEqual({});
    expect(newState.error).toEqual({ error: 'This is an error' });
    expect(newState.loading).toEqual(false);
  });
});
