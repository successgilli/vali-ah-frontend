// utils
import http from 'utils/http';
import recordSaga from 'utils/tests/runSaga';

// import actions
import defaultReducer, {
  saveUserDetails, socialAuthRequest, makeAPICalls, handleError, initialState
} from './index';

const payload = { accessToken: 'accessToken', provider: 'provider' };

const user = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email@email.com'
};

describe('social login reducer', () => {
  afterEach(() => {
    if (http.post.restore) http.post.restore();
  });

  it('should make API call and get user from the data', async () => {
    const postStub = sinon.stub(http, 'post').resolves({ data: { user } });
    const initialAction = socialAuthRequest(payload);
    const dispatched = await recordSaga(makeAPICalls, initialAction);

    expect(postStub.calledOnce).toBe(true);
    expect(dispatched).toContainEqual(saveUserDetails(user));
  });

  it('should throw error on failed API call', async () => {
    const error = new Error('API call failed');
    const postStub = sinon.stub(http, 'post').throws(error);
    const initialAction = socialAuthRequest(payload);
    const dispatched = await recordSaga(makeAPICalls, initialAction);

    expect(postStub.calledOnce).toBe(true);
    expect(dispatched[0].type).toEqual('vali-ah-frontend/auth/SOCIAL_AUTH_FAILURE');
  });

  it('should create new user', () => {
    const newUser = defaultReducer({}, saveUserDetails(user));

    expect(newUser).toMatchObject({ user });
  });

  it('should update error value in store', () => {
    const action = handleError('error');
    const newState = defaultReducer(initialState, action);

    expect(newState).toMatchObject({ user: {}, error: 'error' });
  });
});
