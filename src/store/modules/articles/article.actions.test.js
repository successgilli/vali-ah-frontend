// actions
import { requestFetchArticle, fetchArticle, handleFetchArticleError } from './index';


it('should check if the requestFetchArticle action is been dispatched', async () => {
  const action = requestFetchArticle();

  expect(action.type).toEqual('FETCH_ARTICLE_LOADING');
});

it('should check if fetchArticle action is being dispatched', async () => {
  const payload = { data: 'fetched article' };
  const action = fetchArticle(payload);

  expect(action.type).toEqual('FETCH_ARTICLE_SUCCESS');
  expect(action.payload.data).toEqual('fetched article');
});

it('should check if handleFetchArticleError action is being dispatched', async () => {
  const payload = { error: 'an error occured' };
  const action = handleFetchArticleError(payload);

  expect(action.type).toEqual('FETCH_ARTICLE_FAILURE');
  expect(action.payload.error).toEqual('an error occured');
});
