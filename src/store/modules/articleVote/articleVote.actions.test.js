// third-party libraries
import { call, put } from 'redux-saga/effects';
import { runSaga } from 'redux-saga';

// utils
import http from 'utils/http';

import API from './requests';
import {
  voteArticle, voteArticleSuccess, voteArticleFailure, vote
} from './index';
import { VOTE_ARTICLE_REQUEST, VOTE_ARTICLE_SUCCESS, VOTE_ARTICLE_FAILURE } from './types';

describe('Article Vote Actions', () => {
  const payload = { articleId: 'articleId', message: 'Vote successfull' };

  beforeEach(() => {
    if (http.post.restore) http.post.restore();
  });

  it('should return VOTE_ARTICLE_REQUEST type', () => {
    const action = voteArticle(payload);

    expect(action.type).toEqual(VOTE_ARTICLE_REQUEST);
    expect(action.payload).toEqual(payload);
  });

  it('shout return VOTE_ARTICLE_SUCCESS type', () => {
    const action = voteArticleSuccess(payload);

    expect(action.type).toEqual(VOTE_ARTICLE_SUCCESS);
    expect(action.payload).toEqual(payload);
  });

  it('shout return VOTE_ARTICLE_FAILURE type', () => {
    const action = voteArticleFailure('error');

    expect(action.type).toEqual(VOTE_ARTICLE_FAILURE);
    expect(action.payload).toEqual({ error: 'error' });
  });

  it('dispatch action on success', async () => {
    const postStub = sinon.stub(http, 'post').resolves({ data: { message: 'success' } });
    const initialAction = voteArticle({ articleId: 'articleId', voteType: 'upVote' });

    const saga = runSaga(
      {
        dispatch: (action) => expect(action.payload).toMatchObject({ message: 'success' })
      },
      vote,
      initialAction
    ).done;

    expect(postStub.calledOnce).toBe(true);
    expect(saga).toBeUndefined();
  });

  it('should dispatch action on failure', async () => {
    const error = new Error('error');
    const postStub = sinon.stub(http, 'post').throws(error);
    const initialAction = voteArticle({ articleId: 'articleId', voteType: 'upVote' });

    const saga = runSaga(
      {
        dispatch: (action) => expect(action.payload).toEqual({ error })
      },
      vote,
      initialAction
    ).done;

    expect(postStub.calledOnce).toBe(true);
    expect(saga).toBeUndefined();
  });

  describe('Generator *vote', () => {
    let iterator;
    let action;

    beforeAll(() => {
      action = voteArticle(payload);
      iterator = vote(action);
    });

    it('should yield an effect call(API.voteArticle, action.payload)', () => {
      expect(iterator.next().value).toEqual(call(API.voteArticle, action.payload));
    });

    it('should yield an effect put({ type: VOTE_ARTICLE_SUCCESS, payload: {} })', () => {
      const apiResponse = { data: { test: 'test' } };
      expect(iterator.next(apiResponse).value).toEqual(
        put({ type: VOTE_ARTICLE_SUCCESS, payload: { ...payload, ...apiResponse.data } })
      );
    });

    it('should yield an effect put({ type: VOTE_ARTICLE_FAILURE, payload: {} }) on failure', () => {
      expect(iterator.throw('error').value).toEqual(
        put({ type: VOTE_ARTICLE_FAILURE, payload: { error: 'error' } })
      );
    });
  });
});
