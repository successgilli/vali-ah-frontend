// react libraries
import React from 'react';

// third-party libraries
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// component
import Icon from './index';

const actions = {
  onClick: action('onClick'),
};

storiesOf('Icon', module)
  .add('upvote', () => <Icon icon="upvote" {...actions} />)
  .add('downvote', () => <Icon icon="downvote" {...actions} />)
  .add('active', () => <Icon icon="upvote" active {...actions} />);
