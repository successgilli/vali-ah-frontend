// third-party libraries
import { combineReducers } from 'redux';

import login from 'modules/login';
import articleVote from 'modules/articleVote';
import getArticle from 'modules/getArticle';

export default combineReducers({
  articleVote,
  login,
  getArticle
});
