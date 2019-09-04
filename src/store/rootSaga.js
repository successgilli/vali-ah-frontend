// third-party libraries
import { all } from 'redux-saga/effects';

// modules
import { watchVoteRequest } from 'modules/articleVote';

export default function* rootSaga() {
  yield all([
    watchVoteRequest()
  ]);
}
