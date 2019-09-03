import * as React from 'react';

// third-party libraries
import { storiesOf } from '@storybook/react';

// component
import Message from './index';

const heading = 'There were some errors with your submission';
const messages = ['message 1', 'message 2'];

storiesOf('Message', module)
  .add('Without Heading', () => <Message />)
  .add('With Heading', () => <Message heading={heading} active />)
  .add('With messages', () => <Message heading={heading} active messages={messages} />)
  .add('Error', () => <Message heading={heading} active error messages={messages} />);
