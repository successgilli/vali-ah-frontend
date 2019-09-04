// third-party libraries
import { call, put, takeLatest } from 'redux-saga/effects';

// types
import {
  VOTE_ARTICLE_REQUEST, VOTE_ARTICLE_SUCCESS, VOTE_ARTICLE_FAILURE, INIT_ARTICLE_VOTE_COUNT
} from './types';

// API requests
import API from './requests';

export const voteArticle = (payload) => ({ type: VOTE_ARTICLE_REQUEST, payload });
export const initArticleVoteCount = (payload) => ({ type: INIT_ARTICLE_VOTE_COUNT, payload });
export const voteArticleSuccess = (payload) => ({
  type: VOTE_ARTICLE_SUCCESS, payload
});
export const voteArticleFailure = (error) => ({
  type: VOTE_ARTICLE_FAILURE,
  payload: { error }
});


const changeVoteCount = (payload) => {
  const {
    upVoteCount, downVoteCount, voteType, prevVote
  } = payload;

  const voteCount = {
    [`${prevVote}Count`]: payload[`${prevVote}Count`] - 1,
    [`${voteType}Count`]: payload[`${voteType}Count`] + 1
  };

  return { upVoteCount, downVoteCount, ...voteCount };
};

export function* vote(action) {
  try {
    const voteResponse = yield call(API.voteArticle, action.payload);

    yield put(voteArticleSuccess({ ...action.payload, ...voteResponse.data }));
  } catch (error) {
    yield put(voteArticleFailure(error));
  }
}

export function* watchVoteRequest() {
  yield takeLatest(VOTE_ARTICLE_REQUEST, vote);
}

const initialState = {
  votes: {
    upVoteCount: 0,
    downVoteCount: 0,
  },
  error: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case VOTE_ARTICLE_SUCCESS:
    return {
      ...state,
      votes: {
        ...state.votes,
        ...{ ...changeVoteCount({ ...state.votes, ...payload }) }
      }
    };
  case VOTE_ARTICLE_FAILURE:
    return {
      ...state,
      error: payload.error
    };
  case VOTE_ARTICLE_REQUEST:
    return {
      ...state,
      error: null
    };
  case INIT_ARTICLE_VOTE_COUNT:
    return {
      ...state,
      votes: {
        ...state.votes,
        ...payload
      }
    };
  default:
    return state;
  }
};
