import { call, put, takeLatest } from 'redux-saga/effects';

import * as types from './types';

import * as API from './requests';

export const getCommentsRequest = (articleId) => ({
  type: types.GET_COMMENTS_REQUEST, payload: { articleId }
});

export const getCommentsSuccess = (comments) => ({
  type: types.GET_COMMENTS_SUCCESS, payload: { comments }
});

export const getCommentsFailure = (error) => ({
  type: types.GET_COMMENTS_FAILURE, payload: { error }
});

export const createCommentRequest = (articleId, content) => ({
  type: types.CREATE_COMMENT_REQUEST, payload: { articleId, content }
});

export const createCommentSuccess = (comment) => ({
  type: types.CREATE_COMMENT_SUCCESS, payload: { comment }
});

export const createCommentFailure = (error) => ({
  type: types.CREATE_COMMENT_FAILURE, payload: { error }
});

export function* getComments({ payload }) {
  try {
    const comments = yield call(API.getComments, payload);
    yield put(getCommentsSuccess(comments));
  } catch (error) {
    yield put(getCommentsFailure(error));
  }
}

export function* createComment({ payload }) {
  try {
    const comment = yield call(API.createComment, payload);
    yield put(createCommentSuccess(comment));
  } catch (error) {
    yield put(createCommentFailure(error));
  }
}

export function* watchGetCommentsRequest() {
  yield takeLatest(types.GET_COMMENTS_REQUEST, getComments);
}

export function* watchCreateCommentRequest() {
  yield takeLatest(types.CREATE_COMMENT_REQUEST, createComment);
}

const initialState = {
  comments: [],
  createdComment: {},
  apiCallsInProgress: false,
  error: null
};

const apiCallStarted = (type) => (
  type.includes('GET_COMMENTS_REQUEST')
);

export default (state = initialState, { type, payload }) => {
  if (apiCallStarted(type)) {
    return {
      ...state,
      apiCallInProgress: true
    };
  }
  switch (type) {
  case types.GET_COMMENTS_SUCCESS:
    return {
      ...state,
      comments: payload.comments,
      apiCallInProgress: false
    };
  case types.GET_COMMENTS_FAILURE:
    return {
      ...state,
      error: payload.error,
      apiCallInProgress: false
    };
  case types.CREATE_COMMENT_SUCCESS:
    return {
      ...state,
      createdComment: payload.comment
    };
  case types.CREATE_COMMENT_FAILURE:
    return {
      ...state,
      error: payload.error,
    };
  default:
    return state;
  }
};
