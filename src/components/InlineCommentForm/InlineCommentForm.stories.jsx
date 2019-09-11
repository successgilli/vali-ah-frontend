
// react libraries
import * as React from 'react';

// third-party libraries
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

// component
import InlineComment from './index';

storiesOf('InlineComment', module)
  .add('InlineComment', () => <InlineComment />);
