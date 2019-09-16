
// react libraries
import * as React from 'react';

// third-party libraries
import { storiesOf } from '@storybook/react';

import { commentData } from 'fixtures/inlineComments';
// component
import InlineCommentCard from './index';

storiesOf('InlineCommentCard', module)
  .add('comment with valid highlight', () => <InlineCommentCard comments={commentData} />);
