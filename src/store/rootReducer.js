// third-party libraries
import { combineReducers } from 'redux';

// modules
import articleVote from 'modules/articleVote';
import login from 'modules/login';
import search from 'modules/search';

export default combineReducers({
  articleVote,
  login,
  search
});
