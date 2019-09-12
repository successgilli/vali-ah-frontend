// third-party libraries
import { call, put, takeLatest } from 'redux-saga/effects';

// requests
import API from 'modules/userSelection/requests';

// types
import * as types from './types';

// actions
export const getSelectionRequest = (option) => ({ option, type: types.GET_SELECTION_REQUEST });
export const getSelectionSuccess = (articles) => ({ articles, type: types.GET_SELECTION_SUCCESS });
export const getSelectionFailure = (error) => ({ error, type: types.GET_SELECTION_FAILURE });

// fallback query
export const fallBack = (query) => {
  switch (query) {
  case 'emotion':
  case 'relationship':
    return 'love';
  case 'finance':
  case 'motivation':
  case 'management':
    return 'business';
  case 'love':
  case 'dating':
    return 'relationship';
  case 'business':
    return 'management';
  default:
    return 'emotion';
  }
};

const fetchResultsWithFallback = async ({ query }) => {
  let control = 0;
  const search = async (term) => {
    const results = await API.fetchSelection({ query: term });

    localStorage.setItem('userCategory', term);

    const fallBackTerm = !control ? fallBack(term) : fallBack(' ');

    control += 1;

    if (!results.length && control < 3) return search(fallBackTerm);

    return results;
  };

  return search(query);
};

export function* getSelection(action) {
  try {
    const categoryResult = yield call(fetchResultsWithFallback, action.option);

    yield put(getSelectionSuccess(categoryResult));
  } catch (error) {
    yield put(getSelectionFailure(error));
  }
}

export function* watchSelectionRequest() {
  yield takeLatest(types.GET_SELECTION_REQUEST, getSelection);
}

const initialState = {
  isLoading: false,
  userSelection: null
};

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
  case types.GET_SELECTION_REQUEST:
    return {
      ...state,
      isLoading: true
    };
  case types.GET_SELECTION_SUCCESS:
    return {
      ...state,
      userSelection: action.articles,
      isLoading: false
    };
  case types.GET_SELECTION_FAILURE:
    return {
      ...action.error,
      isLoading: false
    };
  default:
    return state;
  }
};
