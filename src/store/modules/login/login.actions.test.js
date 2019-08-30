import { runSaga } from 'redux-saga';
import sinon from 'sinon';
import http from 'utils/http';

import { fetchLogin, requestLogin } from './index';

describe('Saga test', () => {
  it('should dispatch 3 actions and login user', async () => {
    const dispatchedActions = [];
    sinon.stub(http, 'post').callsFake(() => ({
      status: 'success',
      data: {
        user: {}
      }
    }));
    const fakeStore = {
      loginError: {},
      isLoggedIn: 'false',
      user: {},
      dispatch: (action) => dispatchedActions.push(action)
    };
    const payloads = { email: 'successgilli@gmail.com', password: 'password' };

    await runSaga(fakeStore, fetchLogin, requestLogin(payloads)).toPromise();

    http.post.restore();

    expect(dispatchedActions[0].type).toEqual('ERROR_RESET');
    expect(dispatchedActions[dispatchedActions.length - 1].type).toEqual('LOGIN_USER');
    expect(dispatchedActions[dispatchedActions.length - 1]).toHaveProperty('payload');
    expect(dispatchedActions.length).toBe(2);
  });

  it('should handle user not registered error', async () => {
    const dispatchedActions = [];
    sinon.stub(http, 'post').callsFake(() => ({
      status: 404,
      data: {
        error: {
          message: 'user not registered'
        }
      }
    }));
    const fakeStore = {
      loginError: {},
      isLoggedIn: 'false',
      user: {},
      dispatch: (action) => dispatchedActions.push(action)
    };
    const payloads = { email: 'successgilli@gmail.com', password: 'password' };

    await runSaga(fakeStore, fetchLogin, requestLogin(payloads)).toPromise();

    http.post.restore();

    expect(dispatchedActions[0].type).toEqual('LOGIN_RESET');
    expect(dispatchedActions[dispatchedActions.length - 1].type).toEqual('LOGIN_ERROR');
    expect(dispatchedActions[dispatchedActions.length - 1]).toHaveProperty('payload');
    expect(dispatchedActions.length).toBe(2);
  });

  it('should handle 400 server error', async () => {
    const dispatchedActions = [];
    sinon.stub(http, 'post').callsFake(() => ({
      status: 400,
      data: {
        error: {
          message: 'server error'
        }
      }
    }));
    const fakeStore = {
      loginError: {},
      isLoggedIn: 'false',
      user: {},
      dispatch: (action) => dispatchedActions.push(action)
    };
    const payloads = { email: 'successgilli@gmail.com', password: 'password' };

    await runSaga(fakeStore, fetchLogin, requestLogin(payloads)).toPromise();

    http.post.restore();

    expect(dispatchedActions[0].type).toEqual('LOGIN_RESET');
    expect(dispatchedActions[dispatchedActions.length - 1].type).toEqual('LOGIN_ERROR');
    expect(dispatchedActions[dispatchedActions.length - 1]).toHaveProperty('payload');
    expect(dispatchedActions.length).toBe(2);
  });

  it('should handle different types of 400 server error', async () => {
    const dispatchedActions = [];
    sinon.stub(http, 'post').callsFake(() => ({
      status: 400,
      data: {
        error: {
          errors: 'errors',
          message: { email: 'bad request' }
        }
      }
    }));
    const fakeStore = {
      loginError: {},
      isLoggedIn: 'false',
      user: {},
      dispatch: (action) => dispatchedActions.push(action)
    };
    const payloads = { email: 'successgilli@gmail.com', password: 'password' };

    await runSaga(fakeStore, fetchLogin, requestLogin(payloads)).toPromise();

    http.post.restore();
  });

  it('should anyother error', async () => {
    const dispatchedActions = [];
    sinon.stub(http, 'post').throws();
    const fakeStore = {
      loginError: {},
      isLoggedIn: 'false',
      user: {},
      dispatch: (action) => dispatchedActions.push(action)
    };
    const payloads = { email: 'successgilli@gmail.com', password: 'password' };

    await runSaga(fakeStore, fetchLogin, requestLogin(payloads)).toPromise();

    http.post.restore();

    expect(dispatchedActions[0].type).toEqual('LOGIN_RESET');
    expect(dispatchedActions[dispatchedActions.length - 1]).toHaveProperty('payload');
    expect(typeof dispatchedActions[dispatchedActions.length - 1].payload.error).toBe('string');
    expect(dispatchedActions.length).toBe(2);
  });

  it('should catch any other server response', async () => {
    const dispatchedActions = [];
    sinon.stub(http, 'post').callsFake(() => ({
      status: 500
    }));

    const fakeStore = {
      loginError: {},
      isLoggedIn: 'false',
      user: {},
      dispatch: (action) => dispatchedActions.push(action)
    };
    const payloads = { email: 'successgilli@gmail.com', password: 'password' };

    await runSaga(fakeStore, fetchLogin, requestLogin(payloads)).toPromise();

    http.post.restore();

    expect(dispatchedActions[0].type).toEqual('LOGIN_RESET');
    expect(dispatchedActions[dispatchedActions.length - 1]).toHaveProperty('payload');
    expect(typeof dispatchedActions[dispatchedActions.length - 1].payload.message).toBe('string');
    expect(dispatchedActions.length).toBe(2);
  });
});
