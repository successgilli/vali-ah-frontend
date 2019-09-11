// third-party libraries
import { combineReducers } from 'redux';

import login from 'modules/login';
import articleVote from 'modules/articleVote';
import inlineComment from 'modules/inlineComment';

export default combineReducers({
  articleVote,
  inlineComment,
  login
});
