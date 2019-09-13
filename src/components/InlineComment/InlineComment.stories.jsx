
// react libraries
import React from 'react';

// third-party libraries
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import { BaseComponent } from 'fixtures/inlineCommentParent';

storiesOf('InlineComment', module)
  .add('InlineComment', () => <BaseComponent />);
