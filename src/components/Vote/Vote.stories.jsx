// react libraries
import * as React from 'react';

import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';

import Vote from 'components/Vote';

import store from 'store/';

const withProvider = (story) => (
  <Provider store={store}>
    { story() }
  </Provider>
);

storiesOf('Vote', module)
  .addDecorator(withProvider)
  .add('upvoted', () => <Vote articleId="645a93d8-252a-4f5b-9a72-0a3af9323614" upVoteCount={30} activeVoteType="upVote" />)
  .add('downvoted', () => <Vote articleId="645a93d8-252a-4f5b-9a72-0a3af9323614" upVoteCount={30} activeVoteType="downVote" />)
  .add('nullvote', () => <Vote articleId="645a93d8-252a-4f5b-9a72-0a3af9323614" upVoteCount={30} activeVoteType="nullVote" />);
