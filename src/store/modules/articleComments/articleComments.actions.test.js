import http from 'utils/http';
import { comments } from 'fixtures/articleComments';
import recordSaga from 'utils/tests/runSaga';

import * as types from './types';
import * as actions from './index';


const {
  GET_COMMENTS_SUCCESS, GET_COMMENTS_REQUEST, GET_COMMENTS_FAILURE,
  CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_FAILURE
} = types;

const {
  getCommentsRequest, getCommentsSuccess, getCommentsFailure, createCommentRequest,
  createCommentSuccess, createCommentFailure, createComment, getComments
} = actions;

const createPayload = { articleId: 'articleId', content: 'great article' };

describe('Comment actions', () => {
  afterEach(() => {
    if (http.get.restore) http.get.restore();
    if (http.post.restore) http.post.restore();
  });

  it('should return GET_COMMENTS_REQUEST type', () => {
    const action = getCommentsRequest('articleId');

    expect(action.type).toEqual(GET_COMMENTS_REQUEST);
    expect(action.payload).toEqual({ articleId: 'articleId' });
  });

  it('should return GET_COMMENTS_SUCCESS type', () => {
    const action = getCommentsSuccess(comments);

    expect(action.type).toEqual(GET_COMMENTS_SUCCESS);
    expect(action.payload).toMatchObject({ comments });
  });

  it('should return GET_COMMENTS_FAILURE type', () => {
    const action = getCommentsFailure('error');

    expect(action.type).toEqual(GET_COMMENTS_FAILURE);
    expect(action.payload).toEqual({ error: 'error' });
  });

  it('should return CREATE_COMMENT_REQUEST type', () => {
    const action = createCommentRequest(createPayload.articleId, createPayload.content);

    expect(action.type).toEqual(CREATE_COMMENT_REQUEST);
    expect(action.payload).toMatchObject(createPayload);
  });

  it('should return CREATE_COMMENT_SUCCESS type', () => {
    const action = createCommentSuccess(comments[0]);

    expect(action.type).toEqual(CREATE_COMMENT_SUCCESS);
    expect(action.payload).toMatchObject({ comment: comments[0] });
  });

  it('should return CREATE_COMMENT_FAILURE type', () => {
    const action = createCommentFailure('error');

    expect(action.type).toEqual(CREATE_COMMENT_FAILURE);
    expect(action.payload).toEqual({ error: 'error' });
  });

  it('should dispatch action to call api on success', async () => {
    const getStub = sinon.stub(http, 'get').resolves({ data: comments });
    const initialAction = getCommentsRequest('artcileId');
    const dispatched = await recordSaga(getComments, initialAction);

    expect(getStub.calledOnce).toBe(true);
    expect(dispatched[0].type).toEqual('vali-ah-frontend/articleComments/GET_COMMENTS_SUCCESS');
  });

  it('should dispatch action on failure', async () => {
    const error = new Error('error');
    const getStub = sinon.stub(http, 'get').throws(error);
    const initialAction = getCommentsRequest('artcileId');
    const dispatched = await recordSaga(getComments, initialAction);

    expect(getStub.calledOnce).toBe(true);
    expect(dispatched[0].type).toEqual('vali-ah-frontend/articleComments/GET_COMMENTS_FAILURE');
  });

  it('should dispatch create comment api on success', async () => {
    const postStub = sinon.stub(http, 'post').resolves({ data: comments[0] });
    const initialAction = createCommentRequest(createPayload.articleId, createPayload.content);
    const dispatched = await recordSaga(createComment, initialAction);

    expect(postStub.calledOnce).toBe(true);
    expect(dispatched[0].type).toEqual('vali-ah-frontend/articleComments/CREATE_COMMENT_SUCCESS');
  });

  it('should dispatch create comment api on success', async () => {
    const error = new Error('error');
    const postStub = sinon.stub(http, 'post').throws(error);
    const initialAction = createCommentRequest(createPayload.articleId, createPayload.content);
    const dispatched = await recordSaga(createComment, initialAction);

    expect(postStub.calledOnce).toBe(true);
    expect(dispatched[0].type).toEqual('vali-ah-frontend/articleComments/CREATE_COMMENT_FAILURE');
  });
});
