import defaultReducer, {
  voteArticleSuccess, voteArticleFailure, voteArticle, initArticleVoteCount
} from './index';

describe('Article Vote Reducer', () => {
  const initialState = {
    votes: { upVoteCount: 0, downVoteCount: 0 },
    error: null
  };

  it('should initialize vote count value in store', () => {
    const payload = {
      upVoteCount: 5, downVoteCount: 2
    };
    const action = initArticleVoteCount(payload);
    const newState = defaultReducer(initialState, action);

    expect(newState).toMatchObject({ votes: { upVoteCount: 5, downVoteCount: 2 }, error: null });
  });

  it('should update vote count value in store', () => {
    const payload = {
      articleId: 'articleId', message: 'vote successful', voteType: 'upVote', prevVote: 'nullVote'
    };
    const action = voteArticleSuccess(payload);
    const newState = defaultReducer(initialState, action);

    expect(newState).toMatchObject({ votes: { upVoteCount: 1, downVoteCount: 0 }, error: null });
  });

  it('should update error value in store', () => {
    const action = voteArticleFailure('error');
    const newState = defaultReducer(initialState, action);

    expect(newState).toMatchObject({ votes: { upVoteCount: 0, downVoteCount: 0 }, error: 'error' });
  });

  it('should update error value to null', () => {
    const payload = {
      articleId: 'articleId', message: 'vote successful', voteType: 'upVote', prevVote: 'nullVote'
    };
    const action = voteArticle(payload);
    const newState = defaultReducer({ ...initialState, error: 'error' }, action);

    expect(newState).toMatchObject({ votes: { upVoteCount: 0, downVoteCount: 0 }, error: null });
  });
});
