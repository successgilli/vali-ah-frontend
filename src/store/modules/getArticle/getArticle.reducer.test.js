// third-party libararies
import { runSaga } from 'redux-saga';
import sinon from 'sinon';
import http from 'utils/http';

// actions
import {
  getArticleRequest,
  getArticleRequestSaga
} from './index';

describe('Article reducer', () => {
  beforeEach(() => {
    if (http.get.restore) http.get.restore();
  });
  it('should get article', async () => {
    sinon.stub(http, 'get').resolves({
      article: {
      }
    });
    const payload = {
    };
    const dispatched = [];

    await runSaga({
      dispatch: (action) => dispatched.push(action),
    }, getArticleRequestSaga,
    getArticleRequest({ ...payload })).toPromise();
    expect(dispatched[0].type).toBe('vali-ah-frontend/Article/GET_ARTICLE_SUCCESS');
  });
});
