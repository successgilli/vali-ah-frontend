// types
import { ACTIVATE_MODAL } from 'modules/header/types';

// actions
export const activateModal = (bool) => ({ type: ACTIVATE_MODAL, payload: bool });

const initialState = {
  activateModal: false
};

export default (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
  case ACTIVATE_MODAL:
    return {
      activateModal: true,
      ...payload
    };
  default:
    return state;
  }
};
