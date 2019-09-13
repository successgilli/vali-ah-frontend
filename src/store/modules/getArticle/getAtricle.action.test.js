import http from 'utils/http';
import { getArticleRequest, getArticleSuccess, getArticleFailure } from './index';
import { GET_ARTICLE_REQUEST, GET_ARTICLE_SUCCESS, GET_ARTICLE_FAILURE } from './types';


describe('should return CREATE_USER_REQUEST type', () => {
  const payload = { articleId: 'articleId' };
  beforeEach(() => {
    if (http.get.restore) http.get.restore();
  });

  it('should return GET_ARTICLE_REQUEST type', () => {
    const action = getArticleRequest(payload);

    expect(action.type).toEqual(GET_ARTICLE_REQUEST);
    expect(action.payload).toEqual(payload);
  });

  it('should return GET_ARTICLE_REQUEST type', () => {
    const action = getArticleSuccess(payload);

    expect(action.type).toEqual(GET_ARTICLE_SUCCESS);
    expect(action.payload).toEqual(payload);
  });

  it('shout return GET_ARTICLE_FAILURE type', () => {
    const action = getArticleFailure('error');

    expect(action.type).toEqual(GET_ARTICLE_FAILURE);
    expect(action.payload).toEqual('error');
  });
});
