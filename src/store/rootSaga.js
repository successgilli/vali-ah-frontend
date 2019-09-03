// third-party libraries
import { all } from 'redux-saga/effects';

// modules
import { watchVoteRequest } from 'modules/articleVote';
import { watchLoginRequests } from 'modules/login';
import { watchPasswordResetRequest, watchPasswordUpdateRequest } from 'modules/passwordReset';


export default function* rootSaga() {
  yield all([
    watchVoteRequest(),
    watchLoginRequests(),
    watchPasswordUpdateRequest(),
    watchPasswordResetRequest()
  ]);
}
