// third-party libraries
import { runSaga } from 'redux-saga';
import sinon from 'sinon';

// utils
import http from 'utils/http';

// actions
import {
  searchArticlesRequest,
  searchArticlesSuccess,
  searchArticlesFailure,
  searchArticles,
} from './index'; // actions

describe('Redux-saga generator', () => {
  beforeEach(() => {
    if (http.get.restore) http.get.restore();
  });
  it('should get search with title ', async () => {
    const dispatched = [];
    const postStub = sinon.stub(http, 'get').resolves({
      data: 'living my life',
      responseBody: 'living my life',
    });

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      searchArticles,
      searchArticlesRequest({ term: 'title', query: 'living my life' }),
    ).toPromise();
    expect(postStub.calledOnce).toEqual(true);
    expect(dispatched[0].type).toEqual('vali-ah-frontend/search/SEARCH_ARTICLES_SUCCESS');
    expect(dispatched[0].payload).toEqual('living my life');
  });

  it('should get search with tag', async () => {
    const dispatched = [];
    const postStub = sinon.stub(http, 'get').resolves({
      data: 'health',
      responseBody: 'health',
    });

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      searchArticles,
      searchArticlesRequest({ term: 'tag', query: 'health' }),
    ).toPromise();
    expect(postStub.calledOnce).toEqual(true);
    expect(dispatched[0].type).toEqual('vali-ah-frontend/search/SEARCH_ARTICLES_SUCCESS');
    expect(dispatched[0].payload).toEqual('health');
  });

  it('should get search with author', async () => {
    const dispatched = [];
    const postStub = sinon.stub(http, 'get').resolves({
      data: 'leo is still the best',
      responseBody: 'leo is still the best',
    });

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      searchArticles,
      searchArticlesRequest({ term: 'author', query: 'leo' }),
    ).toPromise();
    expect(postStub.calledOnce).toEqual(true);
    expect(dispatched[0].type).toEqual('vali-ah-frontend/search/SEARCH_ARTICLES_SUCCESS');
    expect(dispatched[0].payload).toEqual('leo is still the best');
  });

  it('should get search with keyword', async () => {
    const dispatched = [];
    const postStub = sinon.stub(http, 'get').resolves({
      data: 'Is still leo your best writer',
      responseBody: 'Is still leo your best writer',
    });

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      searchArticles,
      searchArticlesRequest({ term: 'keyword', query: 'l' }),
    ).toPromise();
    expect(postStub.calledOnce).toEqual(true);
    expect(dispatched[0].type).toEqual('vali-ah-frontend/search/SEARCH_ARTICLES_SUCCESS');
    expect(dispatched[0].payload).toEqual('Is still leo your best writer');
  });

  it('should not get search with invalid value', async () => {
    const dispatched = [];
    const error = new Error('Request failed with status code 400');
    const postStub = sinon.stub(http, 'get').rejects(error);

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      searchArticles,
      searchArticlesRequest({ term: 'tag', query: 9787990 }),
    ).toPromise();

    expect(postStub.calledOnce).toEqual(true);
    expect(dispatched[0].type).toEqual('vali-ah-frontend/search/SEARCH_ARTICLES_ERROR');
    expect(dispatched[0].payload).toEqual(
      'Request failed with status code 400',
    );
  });
  it('should check if the search loading action is been dispatched', async () => {
    const payload = { query: 'tag', queryText: 'health' };
    const newAction = searchArticlesRequest(payload);

    expect(newAction.type).toEqual('vali-ah-frontend/search/SEARCH_ARTICLES_REQUEST');
  });

  it('should check if receive search action is been dispatched', async () => {
    const payload = { query: 'tag', queryText: 'health' };
    const newAction = searchArticlesSuccess(payload);

    expect(newAction.type).toEqual('vali-ah-frontend/search/SEARCH_ARTICLES_SUCCESS');
    expect(newAction.payload.query).toEqual('tag');
    expect(newAction.payload.queryText).toEqual('health');
  });

  it('should check if receive error action is been dispatched', async () => {
    const payload = { query: 'tag', queryText: 'faking it all' };
    const newAction = searchArticlesFailure(payload);

    expect(newAction.type).toEqual('vali-ah-frontend/search/SEARCH_ARTICLES_ERROR');
    expect(newAction.payload.query).toEqual('tag');
    expect(newAction.payload.queryText).toEqual('faking it all');
  });
});
