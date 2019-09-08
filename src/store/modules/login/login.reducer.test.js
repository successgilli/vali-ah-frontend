import * as types from './types';
import login from './index';

const {
  LOGIN_ERROR, LOGIN_USER, LOGIN_IN_PROGRESS, LOGIN_RESET, ERROR_RESET
} = types;

const initialState = {
  user: {},
  loginError: {},
  isLoggedIn: 'false'
};

it('test', () => {
  expect(1).toEqual(1);
});

describe('test login reducer', () => {
  it('should login', () => {
    const payload = {
      email: 'successgilli@gmail.com',
      password: 'password'
    };
    const newState = login(undefined, {
      type: LOGIN_USER,
      payload
    });

    expect(newState.user).toEqual(payload);
  });

  it('should initial state if no matching action is passed', () => {
    const payload = {
      email: 'successgilli@gmail.com',
      password: 'password'
    };
    const newState = login(undefined, {
      payload
    });
    expect(newState).toEqual(initialState);
  });
});

describe('test isLogin reducer', () => {
  it('should change state of isLoggein in store to loading', () => {
    const newState = login(undefined, {
      type: LOGIN_IN_PROGRESS
    });
    expect(newState.isLoggedIn).toEqual('loading');
  });

  it('should change state of isLoggein in store to false', () => {
    const newState = login(undefined, {
      type: LOGIN_RESET
    });
    expect(newState.isLoggedIn).toEqual('false');
  });

  it('should change state of isLoggein in store to true', () => {
    const newState = login(undefined, {
      type: 'LOGGED_IN'
    });
    expect(newState.isLoggedIn).toEqual('false');
  });
});

describe('test loginError reducer', () => {
  it('should change state of loginError', () => {
    const payload = { email: 'invalid email' };
    const newState = login(undefined, {
      type: LOGIN_ERROR,
      payload
    });
    expect(newState.loginError).toEqual(payload);
  });

  it('should reset state of loginError', () => {
    const payload = { email: 'invalid email' };
    const newState = login(undefined, {
      type: ERROR_RESET,
      payload
    });
    expect(newState.loginError).toEqual({});
  });
});
