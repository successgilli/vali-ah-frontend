// third-party libraries
import { call, put, takeLatest } from 'redux-saga/effects';

// types
import {
  SEARCH_ARTICLES_SUCCESS,
  SEARCH_ARTICLES_FAILURE,
  SEARCH_ARTICLES_REQUEST,
} from 'modules/search/types';

// requests
import API from 'modules/search/requests';

// actions
export const searchArticlesRequest = (payload) => ({
  type: SEARCH_ARTICLES_REQUEST,
  payload,
});
export const searchArticlesSuccess = (payload) => ({
  type: SEARCH_ARTICLES_SUCCESS,
  payload,
});
export const searchArticlesFailure = (payload) => ({
  type: SEARCH_ARTICLES_FAILURE,
  payload,
});

export function* searchArticles(action) {
  try {
    const searchResult = yield call(API.searchArticles, action.payload);
    yield put(searchArticlesSuccess(searchResult.data));
  } catch (error) {
    yield put(searchArticlesFailure(error.message));
  }
}

export function* watchSearchRequests() {
  yield takeLatest(SEARCH_ARTICLES_REQUEST, searchArticles);
}

const initialState = {
  data: [],
  loading: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
  case SEARCH_ARTICLES_REQUEST:
    return {
      ...state,
      loading: true,
    };
  case SEARCH_ARTICLES_SUCCESS:
    return {
      ...state,
      data: action.payload,
      loading: false,
    };
  case SEARCH_ARTICLES_FAILURE:
    return {
      ...state,
      data: action.payload,
      loading: false,
    };
  default:
    return state;
  }
};
