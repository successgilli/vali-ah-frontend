import { user, emptyUserInput } from 'fixtures/signup';
import { createUserRequest, signUpSuccess, signUpFailure } from './index';
import { CREATE_USER_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from './types';


it('should return CREATE_USER_REQUEST type', () => {
  const payload = { user };

  const action = createUserRequest(payload);
  expect(action.type).toEqual(CREATE_USER_REQUEST);
  expect(action.payload).toEqual(payload);
});

it('should return SIGNUP_SUCCESS type', () => {
  const payload = { user };

  const action = signUpSuccess(payload);
  expect(action.type).toEqual(SIGNUP_SUCCESS);
  expect(action.payload).toEqual(payload);
});

it('should return SIGNUP_FAILURE type', () => {
  const payload = { emptyUserInput };

  const action = signUpFailure(payload);
  expect(action.type).toEqual(SIGNUP_FAILURE);
  expect(action.payload).toEqual(payload);
});
