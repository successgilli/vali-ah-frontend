// third-party libraries
import {
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

// types
import {
  REQUEST_PROFILE_SUCCESS,
  PROFILE_FAILURE,
  PROFILE_ISLOADING,
  REQUEST_PROFILE_UPDATE_SUCCESS,
  PROFILE_IS_UPDATING,
  PROFILE_UPDATE_FAILURE,
} from 'modules/profile/types';

// requests
import API from './request';

// get profile actions
export const profileIsloading = (payload) => ({
  type: PROFILE_ISLOADING,
  payload,
});
export const requestProfileSuccess = (payload) => ({
  type: REQUEST_PROFILE_SUCCESS,
  payload,
});
export const profileFailure = (payload) => ({
  type: PROFILE_FAILURE,
  payload,
});

// update profile actions
export const requestProfileUpdateSuccess = (payload) => ({
  type: REQUEST_PROFILE_UPDATE_SUCCESS,
  payload,
});
export const profileIsUpdating = (payload) => ({
  type: PROFILE_IS_UPDATING,
  payload,
});
export const profileUpdateFailure = (payload) => ({
  type: PROFILE_UPDATE_FAILURE,
  payload,
});

// get profile walker
export function* requestProfile(action) {
  try {
    const profileViewResult = yield call(API.viewProfile, action.payload);
    yield put(requestProfileSuccess(profileViewResult.data));
  } catch (error) {
    yield put(profileFailure(error.message));
  }
}

// get profile watcher
export function* watchProfileRequests() {
  yield takeLatest(REQUEST_PROFILE_SUCCESS, requestProfile);
}

// update profile walker
export function* updateProfile(action) {
  try {
    const profileUpdateResult = yield call(API.updateProfile, action.payload);
    yield put(requestProfileUpdateSuccess(profileUpdateResult));
  } catch (error) {
    yield put(profileUpdateFailure(error.response.data.error.errors));
  }
}

// update profile watcher
export function* watchProfileUpdateRequests() {
  yield takeLatest(REQUEST_PROFILE_UPDATE_SUCCESS, updateProfile);
}

const initialState = {
  data: [],
  loading: false,
  errors: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case PROFILE_ISLOADING:
    return {
      ...state,
      loading: true,
      errors: false,
    };
  case REQUEST_PROFILE_SUCCESS:
    return {
      ...state,
      data: action.payload,
      loading: false,
      errors: null,
    };
  case PROFILE_FAILURE:
    return {
      ...state,
      loading: false,
      errors: action.payload,
    };
  case PROFILE_IS_UPDATING:
    return {
      ...state,
      loading: true,
      errors: false,
    };
  case REQUEST_PROFILE_UPDATE_SUCCESS:
    return {
      ...state,
      data: action.payload,
      loading: false,
      errors: false,
    };
  case PROFILE_UPDATE_FAILURE:
    return {
      ...state,
      loading: false,
      errors: action.payload,
    };
  default:
    return state;
  }
};
