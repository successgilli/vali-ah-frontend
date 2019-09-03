import {
  passwordResetRequest, passwordResetSucess, passwordResetFailure, passwordUpdateRequest
} from './index';

import {
  PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCESS, PASSWORD_RESET_FAILURE, PASSWORD_UPDATE_REQUEST
} from './types';

describe('Vote Actions', () => {
  it('should return PASSWORD_RESET_REQUEST type', () => {
    const payload = { email: 'email@exmaple.com' };
    const action = passwordResetRequest(payload);

    expect(action.type).toEqual(PASSWORD_RESET_REQUEST);
    expect(action.payload).toEqual(payload);
  });

  it('should return PASSWORD_RESET_SUCESS type', () => {
    const payload = { email: 'email@exmaple.com', message: 'Reset link has been sent to your email' };
    const action = passwordResetSucess(payload);

    expect(action.type).toEqual(PASSWORD_RESET_SUCESS);
    expect(action.payload).toEqual(payload);
  });

  it('should return PASSWORD_RESET_FAILURE type', () => {
    const payload = { message: 'An unknown error occured' };
    const action = passwordResetFailure(payload);

    expect(action.type).toEqual(PASSWORD_RESET_FAILURE);
    expect(action.payload).toEqual(payload);
  });

  it('should return PASSWORD_RESET_FAILURE type', () => {
    const payload = { message: 'An unknown error occured' };
    const action = passwordResetFailure(payload);

    expect(action.type).toEqual(PASSWORD_RESET_FAILURE);
    expect(action.payload).toEqual(payload);
  });

  it('should return PASSWORD_UPDATE_REQUEST type', () => {
    const payload = { password: 'newpassword', token: 'password reset token', id: 'userId' };
    const action = passwordUpdateRequest(payload);

    expect(action.type).toEqual(PASSWORD_UPDATE_REQUEST);
    expect(action.payload).toEqual(payload);
  });
});
