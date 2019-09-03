import { runSaga } from 'redux-saga';
import { takeLatest } from 'redux-saga/effects';

import http from 'utils/http';

import defaultReducer, {
  watchPasswordResetRequest, watchPasswordUpdateRequest, passwordReset,
  passwordResetRequest, passwordUpdateRequest, passwordResetSucess, passwordResetFailure
} from './index';

import {
  PASSWORD_RESET_REQUEST, PASSWORD_UPDATE_REQUEST, PASSWORD_RESET_SUCESS, PASSWORD_RESET_FAILURE
} from './types';

describe('Vote Reducer', () => {
  beforeEach(() => {
    if (http.post.restore) http.post.restore();
    if (http.patch.restore) http.patch.restore();
  });

  it('should dispatch sucess action on password reset', async () => {
    const postStub = sinon.stub(http, 'post').resolves({ email: 'email@exmaple.com', message: 'Reset link has been sent to your email' });

    const payload = { email: 'email@exmaple.com' };
    const initialAction = passwordResetRequest(payload);

    const dispatched = [];

    const saga = await runSaga({
      dispatch: (action) => dispatched.push(action)
    },
    passwordReset,
    initialAction).toPromise();

    expect(dispatched[0].type).toEqual(PASSWORD_RESET_SUCESS);
    expect(postStub.calledOnce).toBe(true);
    expect(saga).toBeUndefined();
  });

  it('should dispatch failure action on password reset', async () => {
    const postStub = sinon.stub(http, 'post').rejects({ message: 'An error occured' });

    const payload = { email: 'email@exmaple.com' };
    const initialAction = passwordResetRequest(payload);

    const dispatched = [];

    const saga = await runSaga({
      dispatch: (action) => dispatched.push(action)
    },
    passwordReset,
    initialAction).toPromise();

    expect(dispatched[0].type).toEqual(PASSWORD_RESET_FAILURE);
    expect(postStub.calledOnce).toBe(true);
    expect(saga).toBeUndefined();
  });

  it('should dispatch sucess action on password update', async () => {
    const postStub = sinon.stub(http, 'patch').resolves({ message: 'Password update successfull' });

    const payload = { password: 'email@exmaple.com', token: 'token', id: 'id' };
    const initialAction = passwordUpdateRequest(payload);

    const dispatched = [];

    const saga = await runSaga({
      dispatch: (action) => dispatched.push(action)
    },
    passwordReset,
    initialAction).toPromise();

    expect(dispatched[0].type).toEqual(PASSWORD_RESET_SUCESS);
    expect(postStub.calledOnce).toBe(true);
    expect(saga).toBeUndefined();
  });

  it('should dispatch failure action on password reset', async () => {
    const postStub = sinon.stub(http, 'patch').rejects({ message: 'An error occured' });

    const payload = { email: 'email@exmaple.com' };
    const initialAction = passwordUpdateRequest(payload);

    const dispatched = [];

    const saga = await runSaga({
      dispatch: (action) => dispatched.push(action)
    },
    passwordReset,
    initialAction).toPromise();

    expect(dispatched[0].type).toEqual(PASSWORD_RESET_FAILURE);
    expect(postStub.calledOnce).toBe(true);
    expect(saga).toBeUndefined();
  });

  it('should watch and listen to password reset request ', async () => {
    const resetWatcherValue = watchPasswordResetRequest().next().value;
    const sagaTakelatest = takeLatest(PASSWORD_RESET_REQUEST, passwordReset);

    expect(resetWatcherValue).toEqual(sagaTakelatest);
  });

  it('should watch and listen to password update request ', async () => {
    const updateWatcherValue = watchPasswordUpdateRequest().next().value;
    const sagaTakelatest = takeLatest(PASSWORD_UPDATE_REQUEST, passwordReset);

    expect(updateWatcherValue).toEqual(sagaTakelatest);
  });

  it('should return error as false on sucess ', async () => {
    const action = passwordResetSucess({ message: 'sucess' });
    const newState = defaultReducer({}, action);

    expect(newState.error).toEqual(false);
  });

  it('should return message as false on password update request ', async () => {
    const action = passwordUpdateRequest({ message: 'sucess' });
    const newState = defaultReducer({}, action);

    expect(newState.message).toEqual(false);
  });

  it('should return error as true on failure ', async () => {
    const action = passwordResetFailure({ message: 'error' });
    const newState = defaultReducer({}, action);

    expect(newState.error).toEqual(true);
  });
});
