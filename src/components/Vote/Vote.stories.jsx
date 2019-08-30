// react libraries
import React from 'react';

// third-party libraries
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// components
import { Vote } from 'components/Vote';

const actions = {
  initArticleVoteCount: action('initArticleVoteCount'),
  voteArticle: action('voteArticle')
};

storiesOf('Vote', module)
  .add('nullvote', () => <Vote articleId="645a93d8" upVoteCount={29} downVoteCount={10} activeVoteType="nullVote" {...actions} />)
  .add('upvoted', () => <Vote articleId="645a93d8" upVoteCount={30} downVoteCount={10} activeVoteType="upVote" {...actions} />)
  .add('downvoted', () => <Vote articleId="645a93d8" upVoteCount={29} downVoteCount={11} activeVoteType="downVote" {...actions} />);
