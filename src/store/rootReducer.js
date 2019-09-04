// third-party libraries
import { combineReducers } from 'redux';

import login from 'modules/login';
import articleVote from 'modules/articleVote';
import articleComments from 'modules/articleComments';

export default combineReducers({
  articleVote,
  login,
  articleComments
});
