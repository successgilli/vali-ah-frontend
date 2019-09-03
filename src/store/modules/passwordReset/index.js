import { call, put, takeLatest } from 'redux-saga/effects';

import {
  PASSWORD_RESET_REQUEST, PASSWORD_UPDATE_REQUEST, PASSWORD_RESET_SUCESS, PASSWORD_RESET_FAILURE
} from './types';

import API from './requests';

export const passwordResetRequest = (payload) => ({ type: PASSWORD_RESET_REQUEST, payload });
export const passwordResetSucess = (payload) => ({ type: PASSWORD_RESET_SUCESS, payload });
export const passwordResetFailure = (payload) => ({ type: PASSWORD_RESET_FAILURE, payload });
export const passwordUpdateRequest = (payload) => ({ type: PASSWORD_UPDATE_REQUEST, payload });

const requestHandlers = {
  [PASSWORD_UPDATE_REQUEST]: API.updatePassword,
  [PASSWORD_RESET_REQUEST]: API.resetPassword
};

export function* passwordReset(action) {
  try {
    const actionHandler = requestHandlers[action.type];

    const passwordResetResponse = yield call(actionHandler, action.payload);

    yield put(passwordResetSucess({ ...action.payload, ...passwordResetResponse }));
  } catch (error) {
    yield put(passwordResetFailure({ ...error }));
  }
}

export function* watchPasswordResetRequest() {
  yield takeLatest(PASSWORD_RESET_REQUEST, passwordReset);
}

export function* watchPasswordUpdateRequest() {
  yield takeLatest(PASSWORD_UPDATE_REQUEST, passwordReset);
}

export default (state = {}, action) => {
  const { payload } = action;
  switch (action.type) {
  case PASSWORD_UPDATE_REQUEST:
  case PASSWORD_RESET_REQUEST:
    return { message: false };
  case PASSWORD_RESET_SUCESS:
    return { error: false, ...payload };
  case PASSWORD_RESET_FAILURE:
    return { error: true, ...payload };
  default:
    return state;
  }
};
