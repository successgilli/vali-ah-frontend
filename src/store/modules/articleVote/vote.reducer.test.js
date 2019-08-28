import { runSaga } from 'redux-saga';

import http from 'utils/http';
import defaultReducer, { voteOnArticle, onVoteSuccess, vote } from './index';

describe('Vote Reducer', () => {
  beforeEach(() => {
    if (http.post.restore) http.post.restore();
  });

  it('should return updated vote count', () => {
    const payload = {
      articleId: 'articleId', message: 'vote successfull', voteType: 'upVote', prevVote: 'nullVote'
    };
    const action = onVoteSuccess(payload);

    const newState = defaultReducer({ upVoteCount: 0, downVoteCount: 0 }, action);

    expect(newState).toMatchObject({ upVoteCount: 1, downVoteCount: 0 });
  });

  it('dispatch action on sucess', async () => {
    const postStub = sinon.stub(http, 'post').resolves({ responseBody: { message: 'success' } });

    const payload = { articleId: 'articleId', voteType: 'upVote' };
    const initialAction = voteOnArticle(payload);

    const saga = runSaga({
      dispatch: (action) => expect(action.payload).toMatchObject({ message: 'success' })
    },
    vote,
    initialAction).done;

    expect(postStub.calledOnce).toBe(true);
    expect(saga).toBeUndefined();
  });

  it('should dispatch action on failure', async () => {
    const error = new Error();
    const postStub = sinon.stub(http, 'post').throws(error);

    const payload = { articleId: 'articleId', voteType: 'upVote' };
    const initialAction = voteOnArticle(payload);

    const saga = runSaga({
      dispatch: (action) => expect(action.payload).toEqual(error)
    },
    vote,
    initialAction).done;

    expect(postStub.calledOnce).toBe(true);
    expect(saga).toBeUndefined();
  });
});
