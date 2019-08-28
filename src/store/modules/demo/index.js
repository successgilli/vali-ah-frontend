// third-party libraries
import { call, put, takeLatest } from 'redux-saga/effects';

// types
import { REQUEST_DEMO, RECEIVE_DEMO } from 'modules/demo/types';

// requests
import API from 'modules/demo/requests';

// actions
export const requestDemo = () => ({ type: REQUEST_DEMO });
export const receiveDemo = (payload) => ({ type: RECEIVE_DEMO, payload });

function* fetchDemo() {
  try {
    const demoResult = yield call(API.fetchDemo, 'demoId');
    yield put(receiveDemo(demoResult));
  } catch (error) {
    yield put(receiveDemo(error.message));
  }
}

export function* watchDemoRequests() {
  yield takeLatest(REQUEST_DEMO, fetchDemo);
}

export default (state = '', action) => {
  switch (action.type) {
  case RECEIVE_DEMO:
    return action.payload;
  default:
    return state;
  }
};
