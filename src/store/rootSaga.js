// third-party libraries
import { all } from 'redux-saga/effects';

// modules
import { watchVoteRequest } from 'modules/articleVote';
import { watchLoginRequests } from 'modules/login';
import { watchSocialAuthRequests } from 'modules/socialLogin';

export default function* rootSaga() {
  yield all([
    watchVoteRequest(),
    watchLoginRequests(),
    watchSocialAuthRequests()
  ]);
}
