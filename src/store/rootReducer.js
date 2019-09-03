// third-party libraries
import { combineReducers } from 'redux';

import login from 'modules/login';
import articleVote from 'modules/articleVote';
import resetPassword from 'modules/passwordReset';

export default combineReducers({
  articleVote,
  login,
  resetPassword,
});
