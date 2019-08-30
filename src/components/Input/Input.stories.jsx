// react libraries
import React from 'react';

// third-party libraries
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// component
import Input from './index';

storiesOf('Input', module)
  .add('field with email name', () => <Input onChange={action('onChange')} name="email" placeholder="Email" />)
  .add('password field', () => <Input onChange={action('onChange')} name="email" type="password" placeholder="Password" />);
