// react libraries
import * as React from 'react';

// third-party libraries
import { storiesOf } from '@storybook/react';

// components
import { Header } from './index';

storiesOf('Header', module)
  .add('The full navbar', () => <Header />);
