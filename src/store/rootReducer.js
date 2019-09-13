// third-party libraries
import { combineReducers } from 'redux';

import userSelection from 'modules/userSelection';

// modules
import auth from 'modules/auth';
import login from 'modules/login';
import socialLogin from 'modules/socialLogin';
import articleVote from 'modules/articleVote';
import signup from 'modules/signUp';
import header from 'modules/header';
import articles from 'modules/articles';
import getArticle from 'modules/getArticle';

export default combineReducers({
  login,
  articleVote,
  signup,
  header,
  userSelection,
  articles,
  getArticle,
  auth,
  socialLogin,
});
