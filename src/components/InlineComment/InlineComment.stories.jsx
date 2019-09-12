
// react libraries
import * as React from 'react';

// third-party libraries
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import ParentComponent from 'fixtures/inlineCommentParent';
// component
import { InlineComment } from './index';

const BaseComponent = () => (
  <>
    <ParentComponent />
    <InlineComment />
  </>
);

storiesOf('InlineComment', module)
  .add('InlineComment', () => <BaseComponent />);
