// third-party libraries
import {
  call, put, takeLeading, takeLatest
} from 'redux-saga/effects';

// types
import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_REQUEST_SUCCESS,
  GET_PROFILE_FAILURE,
  GET_PROFILE_REQUEST_UPDATE,
  GET_PROFILE_REQUEST_UPDATE_SUCCESS,
  GET_PROFILE_UPDATE_FAILURE,
} from 'modules/profile/types';

// requests
import API from './request';

// get profile actions
export const getProfileRequest = (payload) => ({
  type: GET_PROFILE_REQUEST,
  payload,
});
export const getProfileRequestSuccess = (payload) => ({
  type: GET_PROFILE_REQUEST_SUCCESS,
  payload,
});
export const profileFailure = (payload) => ({
  type: GET_PROFILE_FAILURE,
  payload,
});

// update profile actions
export const getProfileRequestUpdate = (payload) => ({
  type: GET_PROFILE_REQUEST_UPDATE,
  payload,
});

export const getProfileRequestUpdateSuccess = (payload) => ({
  type: GET_PROFILE_REQUEST_UPDATE_SUCCESS,
  payload,
});

export const updateProfileFailure = (payload) => ({
  type: GET_PROFILE_UPDATE_FAILURE,
  payload,
});

// get profile walker
export function* getProfile(action) {
  try {
    const profileViewResult = yield call(API.viewProfile, action.payload);
    yield put(getProfileRequestSuccess(profileViewResult.data));
  } catch (error) {
    yield put(profileFailure(error.message));
  }
}

// get profile watcher
export function* watchProfileRequests() {
  yield takeLatest(GET_PROFILE_REQUEST, getProfile);
}

// update profile walker
export function* updateProfile(action) {
  try {
    const profileUpdateResult = yield call(API.updateProfile, action.payload);
    yield put(getProfileRequestUpdateSuccess(profileUpdateResult));
  } catch (error) {
    yield put(updateProfileFailure(error.response.data.error.errors));
  }
}

// update profile watcher
export function* watchProfileUpdateRequests() {
  yield takeLeading(GET_PROFILE_REQUEST_UPDATE, updateProfile);
}

const initialState = {
  data: [],
  loading: false,
  errors: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case GET_PROFILE_REQUEST:
    return {
      ...state,
      loading: true,
      errors: null,
    };
  case GET_PROFILE_REQUEST_SUCCESS:
    return {
      ...state,
      data: action.payload,
      loading: false,
      errors: null,
    };
  case GET_PROFILE_FAILURE:
    return {
      ...state,
      loading: false,
      errors: action.payload,
    };
  case GET_PROFILE_REQUEST_UPDATE:
    return {
      ...state,
      loading: true,
      errors: null,
    };
  case GET_PROFILE_REQUEST_UPDATE_SUCCESS:
    return {
      ...state,
      data: action.payload,
      loading: false,
      errors: false,
    };
  case GET_PROFILE_UPDATE_FAILURE:
    return {
      ...state,
      loading: false,
      errors: action.payload,
    };
  default:
    return state;
  }
};
