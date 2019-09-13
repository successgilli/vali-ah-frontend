import http from 'utils/http';
import { createdArticle, createArticlePayload } from 'fixtures/articles';
import recordSaga from 'utils/tests/runSaga';

import * as types from './types';
import * as actions from './index';

const {
  CREATE_ARTICLE_SUCCESS, CREATE_ARTICLE_FAILURE, CREATE_ARTICLE_REQUEST
} = types;

const {
  createArticleRequest, createArticleSuccess, createArticleFailure, createArticle
} = actions;

describe('Create article actions', () => {
  afterEach(() => {
    if (http.post.restore) http.post.restore();
  });

  it('should return CREATE_ARTICLE_REQUEST type', () => {
    const action = createArticleRequest(createArticlePayload);

    expect(action.type).toEqual(CREATE_ARTICLE_REQUEST);
    expect(action.payload).toMatchObject({ content: createArticlePayload });
  });

  it('should return CREATE_ARTICLE_SUCCESS type', () => {
    const action = createArticleSuccess(createdArticle);

    expect(action.type).toEqual(CREATE_ARTICLE_SUCCESS);
    expect(action.payload).toMatchObject({ article: createdArticle });
  });

  it('should return CREATE_ARTICLE_FAILURE type', () => {
    const action = createArticleFailure('create article failed');

    expect(action.type).toEqual(CREATE_ARTICLE_FAILURE);
    expect(action.payload).toEqual({ error: 'create article failed' });
  });

  it('should dispatch create article api on success', async () => {
    const postStub = sinon.stub(http, 'post').resolves({ data: createdArticle });
    const initialAction = createArticleRequest(createArticlePayload);
    const dispatched = await recordSaga(createArticle, initialAction);

    expect(postStub.calledOnce).toBe(true);
    expect(dispatched[0].type).toEqual('vali-ah-frontend/articles/CREATE_COMMENT_SUCCESS');
  });

  it('should dispatch action on failure', async () => {
    const error = new Error('create article failed');
    const postStub = sinon.stub(http, 'post').throws(error);
    const initialAction = createArticleRequest(createArticlePayload);
    const dispatched = await recordSaga(createArticle, initialAction);

    expect(postStub.calledOnce).toBe(true);
    expect(dispatched[0].type).toEqual('vali-ah-frontend/articles/CREATE_COMMENT_FAILURE');
  });
});
