// third-party libraries
import { all } from 'redux-saga/effects';

// modules
import { watchVoteRequest } from 'modules/articleVote';
import { watchLoginRequests } from 'modules/login';
import { watchSignupRequest } from 'modules/signUp';
import { watchfollowUserRequest } from 'modules/followUser';

export default function* rootSaga() {
  yield all([
    watchVoteRequest(),
    watchSignupRequest(),
    watchLoginRequests(),
    watchfollowUserRequest()
  ]);
}
