import { runSaga } from 'redux-saga';
import sinon from 'sinon';

import http from 'utils/http';

import { user } from 'fixtures/signup';
import * as types from './types';
// actions
import signup, {
  createUserRequest,
  getSignupRequest
} from './index';

const {
  CREATE_USER_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE
} = types;

const initialState = {
  user: {},
  error: '',
  isRequesting: false
};

it('test', () => {
  expect(1).toEqual(1);
});

describe('test signup request reducer', () => {
  it('should return isRequesting true', () => {
    const payload = {
      email: 'vali@gmail.com',
      password: 'password12'
    };
    const newState = signup(undefined, {
      type: CREATE_USER_REQUEST,
      payload
    });

    expect(newState.isRequesting).toEqual(true);
  });

  it('should return type SIGNUP_SUCCESS', () => {
    const payload = { user };
    const newState = signup(undefined, {
      type: SIGNUP_SUCCESS,
      payload
    });

    expect(newState.user).toEqual(payload.user);
  });

  it('should change state of signupError', () => {
    const payload = { error: { message: '' } };
    const newState = signup(initialState, {
      type: SIGNUP_FAILURE,
      payload
    });
    expect(newState.message).toEqual(payload.message);
  });
});

describe('Signup reducer worker', () => {
  beforeEach(() => {
    if (http.post.restore) http.post.restore();
  });
  it('should signup', async () => {
    sinon.stub(http, 'post').resolves({
      data: { status: 'success', user }
    });
    const payload = { data: { user } };
    const dispatched = [];

    await runSaga({
      dispatch: (action) => dispatched.push(action),
    }, getSignupRequest,
    createUserRequest({ ...payload })).toPromise();
    expect(dispatched[0].payload.data.status).toBe('success');
    expect(dispatched[0].type).toBe('vali-ah-frontend/signUp/SIGNUP_SUCCESS');
  });

  it('should throw error signup', async () => {
    sinon.stub(http, 'post').rejects({
    });
    const payload = {
      error: {
        error: 'error'
      }
    };
    const dispatched = [];

    await runSaga({
      dispatch: (action) => dispatched.push(action),
    }, getSignupRequest,
    createUserRequest({ ...payload })).toPromise();
    expect(dispatched[0].type).toBe('vali-ah-frontend/signUp/SIGNUP_FAILURE');
  });
});
