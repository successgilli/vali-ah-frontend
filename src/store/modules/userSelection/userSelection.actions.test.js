// utils
import http from 'utils/http';

import * as actions from './index';

import * as types from './types';

describe('Article Vote Actions', () => {
  beforeEach(() => {
    if (http.post.restore) http.post.restore();
  });

  it('should create an action GET_SELECTION_REQUEST', () => {
    const option = { query: 'motivation' };
    const action = actions.getSelectionRequest(option);

    expect(action.type).toEqual(types.GET_SELECTION_REQUEST);
    expect(action.option).toEqual(option);
  });

  it('should create an action GET_SELECTION_SUCCESS', () => {
    const option = { query: 'emotion' };
    const action = actions.getSelectionSuccess(option);

    expect(action.type).toEqual(types.GET_SELECTION_SUCCESS);
    expect(action.articles).toEqual(option);
  });

  it('should create an action GET_SELECTION_FAILURE', () => {
    const error = { query: 'emotion' };
    const action = actions.getSelectionFailure(error);

    expect(action.type).toEqual(types.GET_SELECTION_FAILURE);
    expect(action.error).toEqual(error);
  });
});
