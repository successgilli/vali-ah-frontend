import { voteOnArticle, onVoteSuccess } from './index';
import { VOTE_ARTICLE_REQUEST, VOTE_ARTICLE_SUCCESS } from './types';

describe('Vote Actions', () => {
  it('should return VOTE_ON_ARTICLE type', () => {
    const payload = { articleId: 'articleId', voteType: 'upVote' };
    const action = voteOnArticle(payload);

    expect(action.type).toEqual(VOTE_ARTICLE_REQUEST);
    expect(action.payload).toEqual(payload);
  });

  it('shout return VOTE_SUCCESSFULL type', () => {
    const payload = { articleId: 'articleId', message: 'vote successfull' };
    const action = onVoteSuccess(payload);

    expect(action.type).toEqual(VOTE_ARTICLE_SUCCESS);
    expect(action.payload).toEqual(payload);
  });
});
