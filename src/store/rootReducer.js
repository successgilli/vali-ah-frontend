// third-party libraries
import { combineReducers } from 'redux';

import login from 'modules/login';
import articleVote from 'modules/articleVote';
import articles from 'modules/articles';

export default combineReducers({
  articleVote,
  login,
  articles
});
