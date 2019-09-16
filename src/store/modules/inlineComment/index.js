/* eslint-disable import/order */
// third-party libraries
import { call, put, takeLatest } from 'redux-saga/effects';

// types
import {
  INLINE_COMMENT_REQUEST, INLINE_COMMENT_SUCCESS, INLINE_COMMENT_FAILURE, INLINE_COMMENT_CLEAR,
  GET_INLINE_COMMENTS_REQUEST, GET_INLINE_COMMENTS_SUCCESS
} from './types';

// API requests
import API from './requests';

export const createInlineComment = (payload) => ({ type: INLINE_COMMENT_REQUEST, payload });
export const createInlineCommentSuccess = (payload) => ({ type: INLINE_COMMENT_SUCCESS, payload });
export const createInlineCommentFailure = (payload) => ({ type: INLINE_COMMENT_FAILURE, payload });
export const clearInlineCommentState = (payload) => ({ type: INLINE_COMMENT_CLEAR, payload });
export const getInlineComments = (payload) => ({ type: GET_INLINE_COMMENTS_REQUEST, payload });
export const getInlineCommentsSuccess = (payload) => ({
  type: GET_INLINE_COMMENTS_SUCCESS, payload
});

const handler = {
  [INLINE_COMMENT_REQUEST]: {
    API: API.createComment,
    sucess: createInlineCommentSuccess,
    failure: createInlineCommentFailure
  },
  [GET_INLINE_COMMENTS_REQUEST]: {
    API: API.getComments,
    success: getInlineCommentsSuccess,
    failure: () => getInlineCommentsSuccess({})
  }
};

export function* inlineCommentWorker(action) {
  const actionHandler = handler[action.type];
  try {
    const commentResponse = yield call(actionHandler.API, action.payload);

    yield put(actionHandler.sucess({ ...commentResponse.data }));
  } catch (error) {
    yield put(actionHandler.failure(error));
  }
}

export function* watchInlineCommentRequest() {
  yield takeLatest(INLINE_COMMENT_REQUEST, inlineCommentWorker);
}

// eslint-disable-next-line import/no-unresolved
// eslint-disable-next-line import/first
import { commentData } from 'fixtures/inlineComments';

const initialState = {
  comments: commentData
};

export default (state = initialState, { type, payload }) => {
  const { comments } = state;
  switch (type) {
  case GET_INLINE_COMMENTS_REQUEST:
    return { comments };
  case GET_INLINE_COMMENTS_SUCCESS:
    return { isLoading: false, comments: commentData };
  case INLINE_COMMENT_REQUEST:
    return { isLoading: true, comments };
  case INLINE_COMMENT_SUCCESS:
    return { isLoading: false, commented: true, comments };
  case INLINE_COMMENT_FAILURE:
    return {
      isLoading: false, error: true, ...payload, comments
    };
  case INLINE_COMMENT_CLEAR:
    return { comments };
  default:
    return state;
  }
};
