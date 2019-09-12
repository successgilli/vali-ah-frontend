// third-party libraries
import { combineReducers } from 'redux';

import login from 'modules/login';
import articleVote from 'modules/articleVote';
import bookmarks from 'modules/bookmarkedArticles';

export default combineReducers({
  articleVote,
  login,
  bookmarks
});
