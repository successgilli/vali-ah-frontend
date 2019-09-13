// react libraries
import * as React from 'react';

// third-party libraries
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

// component
import CreateInlineComment from './index';

storiesOf('CreateInlineComment', module)
  .add('createInlineComment', () => <CreateInlineComment />);
