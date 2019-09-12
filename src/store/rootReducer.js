// third-party libraries
import { combineReducers } from 'redux';

// modules
import login from 'modules/login';
import articleVote from 'modules/articleVote';
import signup from 'modules/signUp';
import header from 'modules/header';

export default combineReducers({
  login,
  articleVote,
  signup,
  header
});
