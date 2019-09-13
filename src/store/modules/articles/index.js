import { call, put, takeLatest } from 'redux-saga/effects';

import * as types from './types';

import * as API from './requests';

export const createArticleRequest = (content) => ({
  type: types.CREATE_ARTICLE_REQUEST, payload: { content }
});

export const createArticleSuccess = (article) => ({
  type: types.CREATE_ARTICLE_SUCCESS, payload: { article }
});

export const createArticleFailure = (error) => ({
  type: types.CREATE_ARTICLE_FAILURE, payload: { error }
});

export function* createArticle({ payload }) {
  try {
    const article = yield call(API.createArticle, payload);
    yield put(createArticleSuccess(article));
  } catch (error) {
    yield put(createArticleFailure(error));
  }
}

export function* watchCreateArticleRequest() {
  yield takeLatest(types.CREATE_ARTICLE_REQUEST, createArticle);
}

const initialState = {
  createdArticle: {},
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case types.CREATE_ARTICLE_SUCCESS:
    return { ...state, createdArticle: payload.article };
  case types.CREATE_ARTICLE_FAILURE:
    return { ...state, error: payload.error };
  default:
    return state;
  }
};
