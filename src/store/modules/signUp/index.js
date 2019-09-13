// third-party libraries
import { call, put, takeLatest } from 'redux-saga/effects';

// types
import { authenticateUser } from 'modules/auth';
import { CREATE_USER_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from 'modules/signUp/types';

// requests
import API from 'modules/signUp/requests';

// actions
export const createUserRequest = (bool) => ({ type: CREATE_USER_REQUEST, payload: bool });
export const signUpSuccess = (user) => ({ type: SIGNUP_SUCCESS, payload: user });
export const signUpFailure = (error) => ({ type: SIGNUP_FAILURE, payload: error });

export function* getSignupRequest({ payload }) {
  try {
    const authUser = yield call(API.signupUser, payload);
    yield put(authenticateUser(authUser.data));
    yield put(signUpSuccess(authUser));
  } catch (error) {
    yield put(signUpFailure({ ...error }));
  }
}

export function* watchSignupRequest() {
  yield takeLatest(CREATE_USER_REQUEST, getSignupRequest);
}

const initialState = {
  user: {},
  error: '',
  isRequesting: false
};

export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
  case CREATE_USER_REQUEST:
    return {
      isRequesting: true
    };
  case SIGNUP_SUCCESS:
    return {
      ...state,
      error: null,
      user: payload.user,
      success: payload.status,
      isRequesting: false
    };
  case SIGNUP_FAILURE:
    return {
      ...state,
      error: payload.message,
      isRequesting: false
    };
  default:
    return state;
  }
};
