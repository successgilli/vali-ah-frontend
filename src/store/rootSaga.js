// third-party libraries
import { all } from 'redux-saga/effects';

// modules
import { watchVoteRequest } from 'modules/articleVote';
import { watchLoginRequests } from 'modules/login';
import { watchGetCommentsRequest, watchCreateCommentRequest } from 'modules/articleComments';

export default function* rootSaga() {
  yield all([
    watchVoteRequest(),
    watchLoginRequests(),
    watchGetCommentsRequest(),
    watchCreateCommentRequest()
  ]);
}
