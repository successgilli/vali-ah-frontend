// third-party libraries
import { all } from 'redux-saga/effects';

// modules
import { watchVoteRequest } from 'modules/articleVote';
import { watchLoginRequests } from 'modules/login';
import { watchInlineCommentRequest } from 'modules/inlineComment';

export default function* rootSaga() {
  yield all([
    watchVoteRequest(),
    watchLoginRequests(),
    watchInlineCommentRequest()
  ]);
}
