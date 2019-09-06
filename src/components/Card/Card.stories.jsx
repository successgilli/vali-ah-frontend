// react libraries
import * as React from 'react';

// third-party libraries
import { storiesOf } from '@storybook/react';

// components
import Card from './index';

storiesOf('Card', module)
  .add('with text', () => <Card img="img" tag="tag" summary="summary" author="author" title="title" />);
