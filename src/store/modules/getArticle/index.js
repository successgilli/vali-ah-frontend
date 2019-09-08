// third-party libraries
import { call, put, takeLatest } from 'redux-saga/effects';

// requests
import API from './requests';

// types
import * as types from './types';

const { GET_ARTICLE_REQUEST, GET_ARTICLE_SUCCESS, GET_ARTICLE_FAILURE } = types;

// actions
export const getArticleRequest = (payload) => ({ type: GET_ARTICLE_REQUEST, payload });
export const getArticleSuccess = (payload) => ({ type: GET_ARTICLE_SUCCESS, payload });
export const getArticleFailure = (payload) => ({ type: GET_ARTICLE_FAILURE, payload });

export function* getArticleRequestSaga({ payload }) {
  try {
    const article = yield call(API.getArticle, payload);
    yield put(getArticleSuccess(article));
  } catch (error) {
    yield put(getArticleFailure(error));
  }
}

export function* watchArticleRequest() {
  yield takeLatest(GET_ARTICLE_REQUEST, getArticleRequestSaga);
}

const initialState = {
  article: {},
  error: '',
  isRequesting: false
};

export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
  case GET_ARTICLE_REQUEST:
    return {
      ...state,
      isRequesting: true
    };
  case GET_ARTICLE_SUCCESS:
    return {
      ...state,
      isRequesting: false,
      article: payload
    };
  case GET_ARTICLE_FAILURE:
    return {
      ...state,
      isRequesting: false,
      error: payload
    };
  default:
    return state;
  }
};
