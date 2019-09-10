// third-party libraries
import { runSaga } from 'redux-saga';
import sinon from 'sinon';

// utils
import http from 'utils/http';

// actions
import {
  profileIsloading,
  requestProfileSuccess,
  profileFailure,
  requestProfileUpdateSuccess,
  profileIsUpdating,
  profileUpdateFailure,
  requestProfile,
  updateProfile,
} from './index';

//  types
import {
  REQUEST_PROFILE_SUCCESS,
  PROFILE_FAILURE,
  PROFILE_ISLOADING,
  REQUEST_PROFILE_UPDATE_SUCCESS,
  PROFILE_IS_UPDATING,
  PROFILE_UPDATE_FAILURE,
} from './types';

describe('Get profile action', () => {
  beforeEach(() => {
    if (http.get.restore) http.get.restore();
  });

  it('should get profile with users id ', async () => {
    const dispatched = [];
    const postStub = sinon.stub(http, 'get').resolves({
      status: 200,
      statusText: 'OK',
      data: 'just getting data',
      responseBody: 'Will',
    });

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      requestProfile,
      requestProfileSuccess({
        token: 'u9809090then8',
        id: '8572-23455-494994--978hu9-4499',
      }),
    ).toPromise();

    expect(postStub.calledOnce).toEqual(true);
    expect(dispatched[0].type).toEqual(REQUEST_PROFILE_SUCCESS);
    expect(dispatched[0].payload).toEqual('just getting data');
  });

  it('should not get user profile with invalid value', async () => {
    const dispatched = [];
    const error = new Error('Request failed with status code 400');
    const postStub = sinon.stub(http, 'get').rejects(error);

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      requestProfile,
      profileFailure({ token: 'u9809090then8', id: 0 }),
    ).toPromise();

    expect(postStub.calledOnce).toEqual(true);
    expect(dispatched[0].type).toEqual(PROFILE_FAILURE);
    expect(dispatched[0].payload).toEqual(
      'Request failed with status code 400',
    );
  });

  it('should check if the profile loading action is been dispatched', async () => {
    const payload = { id: '8572-23455-494994-4499' };
    const newAction = profileIsloading(payload);

    expect(newAction.type).toEqual(PROFILE_ISLOADING);
  });

  it('should check if receive profile action is been dispatched', async () => {
    const payload = { id: '8572-23455-494994-4499' };
    const newAction = requestProfileSuccess(payload);

    expect(newAction.type).toEqual(REQUEST_PROFILE_SUCCESS);
    expect(newAction.payload.id).toEqual('8572-23455-494994-4499');
  });

  it('should check if receive error action is been dispatched', async () => {
    const payload = { id: '8572-23455-494994-4499' };
    const newAction = profileFailure(payload);

    expect(newAction.type).toEqual(PROFILE_FAILURE);
    expect(newAction.payload.id).toEqual('8572-23455-494994-4499');
  });
});

describe('Update profile action', () => {
  beforeEach(() => {
    if (http.patch.restore) http.patch.restore();
  });

  it('should Update profile with users id ', async () => {
    const dispatched = [];
    const postStub = sinon.stub(http, 'patch').resolves({
      status: 200,
      statusText: 'OK',
      data: 'just updating my data',
      responseBody: 'Will wills',
    });

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      updateProfile,
      requestProfileUpdateSuccess({
        token: 'u9809090then8',
        id: '8572-23455-494994--978hu9-4499',
      }),
    ).toPromise();

    expect(postStub.calledOnce).toEqual(true);
    expect(dispatched[0].type).toEqual(REQUEST_PROFILE_UPDATE_SUCCESS);
    expect(dispatched[0].payload.status).toEqual(200);
    expect(dispatched[0].payload.statusText).toEqual('OK');
    expect(dispatched[0].payload.data).toEqual('just updating my data');
    expect(dispatched[0].payload.responseBody).toEqual('Will wills');
  });

  it('should not update profile with wrong id ', async () => {
    const dispatched = [];
    const error = {
      response: {
        data: {
          error: {
            errors: 'Request failed with status code 400',
          },
        },
      },
    };
    const postStub = sinon.stub(http, 'patch').rejects(error);

    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      updateProfile,
      profileUpdateFailure({ token: 'u9809090then8', id: 0 }),
    ).toPromise();

    expect(postStub.calledOnce).toEqual(true);
    expect(dispatched[0].type).toEqual(PROFILE_UPDATE_FAILURE);
    expect(dispatched[0].payload).toEqual(
      'Request failed with status code 400',
    );
  });

  it('should check if the profile update action is been dispatched', async () => {
    const payload = { id: '8572-23455-494994-4499' };
    const newAction = requestProfileUpdateSuccess(payload);

    expect(newAction.type).toEqual(REQUEST_PROFILE_UPDATE_SUCCESS);
  });

  it('should check if profile is updating action is been dispatched', async () => {
    const payload = { id: '8572-23455-494994-4499' };
    const newAction = profileIsUpdating(payload);

    expect(newAction.type).toEqual(PROFILE_IS_UPDATING);
    expect(newAction.payload.id).toEqual('8572-23455-494994-4499');
  });

  it('should check if receive error action is been dispatched', async () => {
    const payload = { id: '8572-23455-494994-4499' };
    const newAction = profileUpdateFailure(payload);

    expect(newAction.type).toEqual(PROFILE_UPDATE_FAILURE);
    expect(newAction.payload.id).toEqual('8572-23455-494994-4499');
  });
});
