import * as React from 'react';

import { storiesOf } from '@storybook/react';

import FacebookLoginButton from './FacebookLoginButton';

const socialAuthRequest = () => { };

storiesOf('FacebookLoginButton', module)
  .add('default', () => <FacebookLoginButton socialAuthRequest={socialAuthRequest} />);
