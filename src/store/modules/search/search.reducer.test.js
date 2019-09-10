// actions
import mainReducer, {
  searchArticlesRequest,
  searchArticlesSuccess,
  searchArticlesFailure,
} from './index';

describe('Reducers', () => {
  it('should check if reducer is loading search', async () => {
    const initialState = {
      data: [],
      loading: false,
    };
    const newState = mainReducer(initialState, searchArticlesRequest());
    expect(newState.data).toEqual([]);
    expect(newState.loading).toEqual(true);
  });

  it('should check if reducer is receiving search', async () => {
    const initialState = {
      data: [],
      loading: false,
    };
    const payload = {
      author: 'chucks',
    };
    const newState = mainReducer(initialState, searchArticlesSuccess(payload));
    expect(newState.data.author).toEqual('chucks');
    expect(newState.loading).toEqual(false);
  });

  it('should check if reducer is getting an error while receiving search', async () => {
    const initialState = {
      data: [],
      loading: false,
      error: null
    };
    const errorPayload = {
      article: [],
      status: 404,
    };
    const newState = mainReducer(
      initialState,
      searchArticlesFailure(errorPayload),
    );
    expect(newState.error.article).toEqual([]);
    expect(newState.error.status).toEqual(404);
    expect(newState.loading).toEqual(false);
  });
});
