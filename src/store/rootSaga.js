// third-party libraries
import { all } from 'redux-saga/effects';

// modules
import { watchVoteRequest } from 'modules/articleVote';
import { watchArticleRequests } from 'modules/articles';

export default function* rootSaga() {
  yield all([
    watchVoteRequest(),
    watchArticleRequests()
  ]);
}
