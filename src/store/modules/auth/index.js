// types

import { getUser, getToken, saveUser } from 'utils/storage';

import {
  AUTHENTICATE_USER
} from 'modules/auth/types';

export const authenticateUser = (payload) => {
  saveUser(payload);
  return { type: AUTHENTICATE_USER, payload };
};

const initialState = {
  user: getUser(),
  token: getToken()
};

export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
  case AUTHENTICATE_USER:
    return {
      ...payload
    };
  default:
    return state;
  }
};
