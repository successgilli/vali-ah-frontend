import { call, put, takeLatest } from 'redux-saga/effects';

import {
  GET_BOOKMARKED_ARTICLES_REQUEST,
  GET_BOOKMARKED_ARTICLES_SUCCESS,
  GET_BOOKMARKED_ARTICLES_FAILURE
} from './types';

import API from './requests';

export const getBookmarkedArticlesRequest = () => ({ type: GET_BOOKMARKED_ARTICLES_REQUEST });

export const getBookmarkedArticlesSuccess = (articles) => ({
  type: GET_BOOKMARKED_ARTICLES_SUCCESS, payload: { articles }
});

export const getBookmarkedArticlesFailure = (error) => ({
  type: GET_BOOKMARKED_ARTICLES_FAILURE, payload: { error }
});

export function* getBookmarkedArticles() {
  try {
    const articles = yield call(API.getBookmarkedArticles);
    yield put(getBookmarkedArticlesSuccess(articles));
  } catch (error) {
    yield put(getBookmarkedArticlesFailure(error));
  }
}

export function* watchGetBookmarkedArticlesRequest() {
  yield takeLatest(GET_BOOKMARKED_ARTICLES_REQUEST, getBookmarkedArticles);
}

const initialState = {
  articles: [],
  loading: false,
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_BOOKMARKED_ARTICLES_REQUEST:
    return {
      ...state,
      loading: true
    };
  case GET_BOOKMARKED_ARTICLES_SUCCESS:
    return {
      ...state,
      articles: payload.articles,
      loading: false
    };
  case GET_BOOKMARKED_ARTICLES_FAILURE:
    return {
      ...state,
      error: payload.error
    };
  default:
    return state;
  }
};
