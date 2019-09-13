// third-party libraries
import { combineReducers } from 'redux';

import userSelection from 'modules/userSelection';

// modules
import login from 'modules/login';
import articleVote from 'modules/articleVote';
import signup from 'modules/signUp';
import header from 'modules/header';
import articles from 'modules/articles';

export default combineReducers({
  login,
  articleVote,
  signup,
  header,
  userSelection,
  articles
});
