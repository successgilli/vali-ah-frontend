import { runSaga } from 'redux-saga';

import http from 'utils/http';

import defaultReducer, {
  clearInlineCommentState, createInlineCommentFailure, createInlineCommentSuccess,
  createInlineComment, inlineCommentWorker, getInlineComments,
  getInlineCommentsSuccess
} from './index';

describe(' Create Inline Comment saga', () => {
  beforeEach(() => {
    if (http.post.restore) http.post.restore();
  });

  it('should dispatch INLINE_COMMENT_SUCCESS', async () => {
    sinon.stub(http, 'post').resolves({});
    const dispatched = [];
    const initialAction = createInlineComment({});

    await runSaga({
      dispatch: (action) => dispatched.push(action)
    }, inlineCommentWorker, initialAction).toPromise();

    expect(dispatched[0].type).toEqual(createInlineCommentSuccess().type);
  });

  it('should dispatch INLINE_COMMENT_FAILURE', async () => {
    sinon.stub(http, 'post').rejects({});
    const dispatched = [];
    const initialAction = createInlineComment({});

    await runSaga({
      dispatch: (action) => dispatched.push(action)
    }, inlineCommentWorker, initialAction).toPromise();

    expect(dispatched[0].type).toEqual(createInlineCommentFailure().type);
  });
});

describe('GET Inline Comment saga', () => {
  beforeEach(() => {
    if (http.get.restore) http.get.restore();
  });

  it('should dispatch GET_INLINE_COMMENTS_REQUEST_SUCCESS', async () => {
    sinon.stub(http, 'get').resolves({});
    const dispatched = [];
    const initialAction = getInlineComments('id');

    await runSaga({
      dispatch: (action) => dispatched.push(action)
    }, inlineCommentWorker, initialAction).toPromise();

    expect(dispatched[0].type).toEqual(getInlineCommentsSuccess().type);
  });

  it('should dispatch GET_INLINE_COMMENTS_SUCESS on failure', async () => {
    sinon.stub(http, 'get').rejects({});
    const dispatched = [];
    const initialAction = getInlineComments('id');

    await runSaga({
      dispatch: (action) => dispatched.push(action)
    }, inlineCommentWorker, initialAction).toPromise();

    expect(dispatched[0].type).toEqual(getInlineCommentsSuccess().type);
  });
});

describe('Inline Comment default Reducer', () => {
  const initialState = {};

  it('should return initial state for unhandled action', () => {
    const newState = defaultReducer(initialState, {});

    expect(newState).toEqual(initialState);
  });

  it('should return empty state on INLINE_COMMENT_CLEAR', () => {
    const action = clearInlineCommentState();
    const newState = defaultReducer(initialState, action);

    expect(newState).toEqual({});
  });

  it('should return isLoading as false and error on failure', () => {
    const action = createInlineCommentFailure();
    const newState = defaultReducer(initialState, action);

    expect(newState.error).toEqual(true);
    expect(newState.isLoading).toEqual(false);
  });

  it('should return isLoading as false on SUCCESS', () => {
    const action = createInlineCommentSuccess();
    const newState = defaultReducer(initialState, action);

    expect(newState.commented).toEqual(true);
    expect(newState.isLoading).toEqual(false);
  });

  it('should return isLoading as true on INLINE_COMMENT_REQUEST', () => {
    const action = createInlineComment();
    const newState = defaultReducer(initialState, action);

    expect(newState.isLoading).toEqual(true);
  });

  it('should return comments on GET_INLINE_COMMENTS_SUCCESS', () => {
    const action = getInlineCommentsSuccess({});
    const newState = defaultReducer(initialState, action);

    expect(newState).toHaveProperty('comments');
  });
});
