// third-party libraries
import { call, takeLatest, put } from 'redux-saga/effects';

import { authenticateUser } from 'modules/auth';

// types
import {
  LOGIN_USER, LOGIN_IN_PROGRESS, LOGIN_RESET,
  LOGIN_ERROR, ERROR_RESET
} from 'modules/login/types';

// requests
import API from 'modules/login/requests';

// actions
export const requestLogin = (payload) => ({ type: LOGIN_IN_PROGRESS, payload });

const loginUser = (payload) => ({ type: LOGIN_USER, payload });

const handleLoginError = (payload) => ({ type: LOGIN_ERROR, payload });

export function* fetchLogin(action) {
  try {
    const loginResult = yield call(API.loginUser, action.payload);
    switch (loginResult.status) {
    case 400:
      yield put({ type: LOGIN_RESET });
      yield (typeof loginResult.data.error.message === 'object') ? put(handleLoginError({
        error: loginResult.data.error.message
      }))
        : put(handleLoginError(loginResult.data.error.errors));
      return;
    case 404:
      yield put({ type: LOGIN_RESET });
      yield put(handleLoginError({ error: loginResult.data.error.message }));
      return;
    case 'success':
      localStorage.setItem('token', loginResult.data.token);
      yield put(authenticateUser(loginResult.data));
      yield put({ type: ERROR_RESET });
      yield put(loginUser(loginResult.data.user));
      return;
    default:
      // eslint-disable-next-line no-console
      console.log(loginResult.status, 'checking');
      yield put({ type: LOGIN_RESET });
      yield put(handleLoginError({ message: 'error occured' }));
    }
  } catch (error) {
    yield put({ type: LOGIN_RESET });
    yield put(handleLoginError({ error: 'server error' }));
  }
}

export function* watchLoginRequests() {
  yield takeLatest(LOGIN_IN_PROGRESS, fetchLogin);
}

const initialState = {
  user: {},
  loginError: {},
  isLoggedIn: 'false'
};

export default (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_USER:
    return {
      loginError: {},
      user: action.payload,
      isLoggedIn: 'true'
    };
  case LOGIN_ERROR:
    return {
      user: {},
      loginError: action.payload,
      isLoggedIn: 'false'
    };
  case ERROR_RESET:
    return {
      user: {},
      loginError: {},
      isLoggedIn: 'false'
    };
  case LOGIN_IN_PROGRESS:
    return {
      user: {},
      loginError: {},
      isLoggedIn: 'loading'
    };
  case LOGIN_RESET:
    return {
      user: {},
      loginError: {},
      isLoggedIn: 'false'
    };
  default:
    return state;
  }
};
