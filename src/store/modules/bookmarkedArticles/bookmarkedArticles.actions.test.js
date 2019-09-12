import http from 'utils/http';
import articles from 'fixtures/bookmarkedArticles';
import recordSaga from 'utils/tests/runSaga';

import {
  GET_BOOKMARKED_ARTICLES_REQUEST,
  GET_BOOKMARKED_ARTICLES_SUCCESS,
  GET_BOOKMARKED_ARTICLES_FAILURE
} from './types';
import {
  getBookmarkedArticlesRequest,
  getBookmarkedArticlesSuccess,
  getBookmarkedArticlesFailure,
  getBookmarkedArticles
} from './index';

describe('Comment actions', () => {
  afterEach(() => {
    if (http.get.restore) http.get.restore();
  });

  it('should return GET_BOOKMARKED_ARTICLES_REQUEST type', () => {
    const action = getBookmarkedArticlesRequest();

    expect(action.type).toEqual(GET_BOOKMARKED_ARTICLES_REQUEST);
    expect(action.payload).toEqual(undefined);
  });

  it('should return GET_BOOKMARKED_ARTICLES_SUCCESS type', () => {
    const action = getBookmarkedArticlesSuccess(articles);

    expect(action.type).toEqual(GET_BOOKMARKED_ARTICLES_SUCCESS);
    expect(action.payload).toMatchObject({ articles });
  });

  it('should return GET_BOOKMARKED_ARTICLES_FAILURE type', () => {
    const action = getBookmarkedArticlesFailure('error');

    expect(action.type).toEqual(GET_BOOKMARKED_ARTICLES_FAILURE);
    expect(action.payload).toEqual({ error: 'error' });
  });

  it('should dispatch action to call api on success', async () => {
    const getStub = sinon.stub(http, 'get').resolves({ data: articles });
    const initialAction = getBookmarkedArticlesRequest();
    const dispatched = await recordSaga(getBookmarkedArticles, initialAction);

    expect(getStub.calledOnce).toBe(true);
    expect(dispatched[0].type).toEqual('vali-ah-frontend/bookmarkedArticles/GET_BOOKMARKED_ARTICLES_SUCCESS');
  });

  it('should dispatch action on failure', async () => {
    const error = new Error('error');
    const getStub = sinon.stub(http, 'get').throws(error);
    const initialAction = getBookmarkedArticlesRequest();
    const dispatched = await recordSaga(getBookmarkedArticles, initialAction);

    expect(getStub.calledOnce).toBe(true);
    expect(dispatched[0].type).toEqual('vali-ah-frontend/bookmarkedArticles/GET_BOOKMARKED_ARTICLES_FAILURE');
  });
});
