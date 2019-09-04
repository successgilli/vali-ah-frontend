// third-party libraries
import { combineReducers } from 'redux';

// modules
import articleVote from 'modules/articleVote';
import article from 'modules/articles';

export default combineReducers({
  articleVote,
  article
});
