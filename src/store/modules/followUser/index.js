import { call, put, takeLatest } from 'redux-saga/effects';

import API from 'modules/followUser/requests';

import {
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_FAILURE,
} from './types';

export const requestFollowUser = (payload) => ({ payload, type: FOLLOW_USER_REQUEST });
export const followUserSuccess = (payload) => ({ payload, type: FOLLOW_USER_SUCCESS });
export const followUserFailure = (error) => ({ error, type: FOLLOW_USER_FAILURE });

export function* follow({ payload }) {
  try {
    const result = yield call(API.followUser, payload);

    yield put(followUserSuccess(result));
  } catch (error) {
    yield put(followUserFailure(error));
  }
}

export function* watchfollowUserRequest() {
  yield takeLatest(FOLLOW_USER_REQUEST, follow);
}

const initialState = {
  errors: null,
  payload: { active: false }
};

// reducer
export default (state = initialState, { type, payload }) => {
  switch (type) {
  case FOLLOW_USER_REQUEST:
    return {
      ...state,
      loading: true
    };
  case FOLLOW_USER_SUCCESS:
    return {
      ...state,
      payload
    };
  case FOLLOW_USER_FAILURE:
    return {
      ...state,
      errors: payload
    };
  default:
    return state;
  }
};
