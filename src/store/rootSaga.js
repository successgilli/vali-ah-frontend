// third-party libraries
import { all } from 'redux-saga/effects';

// modules
import { watchVoteRequest } from 'modules/articleVote';
import { watchLoginRequests } from 'modules/login';

export default function* rootSaga() {
  yield all([
    watchVoteRequest(),
    watchLoginRequests()
  ]);
}
