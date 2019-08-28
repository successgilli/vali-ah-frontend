// react libraries
import * as React from 'react';

// third-party libraries
import { storiesOf } from '@storybook/react';

import Icon from './index';

storiesOf('Icon', module)
  .add('upvote Icon', () => <Icon icon="upvote" clickHandler={() => {}} />)
  .add('downvote Icon', () => <Icon icon="downvote" clickHandler={() => {}} />);
