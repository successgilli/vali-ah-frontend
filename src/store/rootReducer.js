// third-party libraries
import { combineReducers } from 'redux';

import login from 'modules/login';
import socialLogin from 'modules/socialLogin';
import articleVote from 'modules/articleVote';

export default combineReducers({
  articleVote,
  login,
  socialLogin,
});
