// third-party libraries
import { all } from 'redux-saga/effects';

// modules
import { watchDemoRequests } from 'modules/demo';

export default function* rootSaga() {
  yield all([
    watchDemoRequests()
  ]);
}
