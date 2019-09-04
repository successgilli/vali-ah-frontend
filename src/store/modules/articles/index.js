// third-party libraries
import { call, put, takeLatest } from 'redux-saga/effects';

// types
import {
  FETCH_ARTICLE_LOADING,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_FAILURE
} from 'modules/articles/types';

// requests
import API from 'modules/articles/requests';

// actions
export const requestFetchArticle = (payload) => ({ type: FETCH_ARTICLE_LOADING, payload });
export const fetchArticle = (payload) => ({ type: FETCH_ARTICLE_SUCCESS, payload });
export const handleFetchArticleError = (error) => ({
  type: FETCH_ARTICLE_FAILURE,
  payload: error
});


export function* getArticle(action) {
  try {
    const articleResult = yield call(API.fetchArticle, action.payload);
    yield put(fetchArticle({ ...articleResult.data }));
  } catch (error) {
    yield put(handleFetchArticleError(error.message));
  }
}

export function* watchArticleRequests() {
  yield takeLatest(FETCH_ARTICLE_LOADING, getArticle);
}

const initialState = {
  data: {},
  loading: false,
  error: {}
};
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
  case FETCH_ARTICLE_LOADING:
    return {
      data: {},
      loading: true,
      error: {}
    };
  case FETCH_ARTICLE_SUCCESS:
    return {
      data: payload,
      loading: false,
      error: {}
    };
  case FETCH_ARTICLE_FAILURE:
    return {
      data: {},
      loading: false,
      error: payload
    };
  default:
    return state;
  }
};
