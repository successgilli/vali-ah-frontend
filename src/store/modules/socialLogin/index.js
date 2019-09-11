import { call, put, takeLatest } from 'redux-saga/effects';
import { SOCIAL_AUTH_REQUEST, SOCIAL_AUTH_SUCCESS, SOCIAL_AUTH_FAILURE } from './types';
import apiCalls from './requests';

export const socialAuthRequest = (accessToken, provider) => ({
  type: SOCIAL_AUTH_REQUEST, payload: { accessToken, provider }
});

export const saveUserDetails = (user) => ({ type: SOCIAL_AUTH_SUCCESS, payload: { user } });

export const handleError = (error) => ({ type: SOCIAL_AUTH_FAILURE, payload: { error } });

export function* makeAPICalls({ payload }) {
  try {
    const { user, token } = yield call(apiCalls.socialLoginUser, payload);
    localStorage.setItem('token', token);
    yield put(saveUserDetails(user));
  } catch (error) {
    yield put(handleError(error));
  }
}

export function* watchSocialAuthRequests() {
  yield takeLatest(SOCIAL_AUTH_REQUEST, makeAPICalls);
}

export const initialState = {
  user: {},
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
  case SOCIAL_AUTH_SUCCESS:
    return { ...state, user: action.payload.user };
  case SOCIAL_AUTH_FAILURE:
    return { ...state, error: action.payload.error };
  default:
    return state;
  }
};
