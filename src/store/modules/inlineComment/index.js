// third-party libraries
import { call, put, takeLatest } from 'redux-saga/effects';

// types
import {
  INLINE_COMMENT_REQUEST, INLINE_COMMENT_SUCCESS, INLINE_COMMENT_FAILURE, INLINE_COMMENT_CLEAR
} from './types';

// API requests
import API from './requests';

export const createInlineComment = (payload) => ({ type: INLINE_COMMENT_REQUEST, payload });
export const createInlineCommentSuccess = (payload) => ({ type: INLINE_COMMENT_SUCCESS, payload });
export const createInlineCommentFailure = (payload) => ({ type: INLINE_COMMENT_FAILURE, payload });
export const clearInlineCommentState = (payload) => ({ type: INLINE_COMMENT_CLEAR, payload });

export function* inlineCommentWorker(action) {
  try {
    const commentResponse = yield call(API.createComment, action.payload);

    yield put(createInlineCommentSuccess({ ...action.payload, ...commentResponse.data }));
  } catch (error) {
    yield put(createInlineCommentFailure(error));
  }
}

export function* watchInlineCommentRequest() {
  yield takeLatest(INLINE_COMMENT_REQUEST, inlineCommentWorker);
}

const initialState = {

};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case INLINE_COMMENT_REQUEST:
    return { isLoading: true };
  case INLINE_COMMENT_SUCCESS:
    return { isLoading: false, commented: true };
  case INLINE_COMMENT_FAILURE:
    return { isLoading: false, error: true, ...payload };
  case INLINE_COMMENT_CLEAR:
    return {};
  default:
    return state;
  }
};
