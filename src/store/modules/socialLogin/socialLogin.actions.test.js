import { SOCIAL_AUTH_REQUEST, SOCIAL_AUTH_SUCCESS } from './types';
import { saveUserDetails, socialAuthRequest } from './index';

describe('Social login actions', () => {
  it('should create a SOCIAL_AUTH_REQUEST action', () => {
    const payload = { accessToken: 'accessToken', provider: 'provider' };
    const expectedAction = { type: SOCIAL_AUTH_REQUEST, payload };
    const action = socialAuthRequest(payload.accessToken, payload.provider);

    expect(action).toEqual(expectedAction);
  });

  it('should create a SOCIAL_AUTH_SUCCESS action', () => {
    const user = { firstName: 'firstName', lastName: 'lastName' };
    const expectedAction = { type: SOCIAL_AUTH_SUCCESS, payload: { user } };
    const action = saveUserDetails(user);

    expect(action).toEqual(expectedAction);
  });
});
