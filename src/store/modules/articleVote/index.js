import { call, put, takeLatest } from 'redux-saga/effects';

import { VOTE_ARTICLE_REQUEST, VOTE_ARTICLE_SUCCESS, VOTE_ARTICLE_COUNT } from './types';

import API from './requests';

export const voteOnArticle = (payload) => ({ type: VOTE_ARTICLE_REQUEST, payload });
export const initArticleVoteCount = (payload) => ({ type: VOTE_ARTICLE_COUNT, payload });
export const onVoteSuccess = (payload) => ({ type: VOTE_ARTICLE_SUCCESS, payload });

const changeVoteCount = (payload) => {
  const {
    upVoteCount, downVoteCount, voteType, prevVote
  } = payload;

  const voteCount = { [`${prevVote}Count`]: payload[`${prevVote}Count`] - 1, [`${voteType}Count`]: payload[`${voteType}Count`] + 1 };

  return { upVoteCount, downVoteCount, ...voteCount };
};

export function* vote(action) {
  try {
    const voteResponse = yield call(API.voteArticle, action.payload);

    yield put(onVoteSuccess({ ...action.payload, ...voteResponse }));
  } catch (error) {
    yield put(onVoteSuccess(error));
  }
}

export function* watchVoteRequest() {
  yield takeLatest(VOTE_ARTICLE_REQUEST, vote);
}

const initialState = {
  upVoteCount: 0, downVoteCount: 0
};

export default (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
  case VOTE_ARTICLE_SUCCESS:
    return { ...state, ...{ ...changeVoteCount({ ...state, ...payload }) } };
  case VOTE_ARTICLE_COUNT:
    return { ...state, ...payload };
  default:
    return state;
  }
};
