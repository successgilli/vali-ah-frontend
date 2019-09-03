import * as React from 'react';

// // third-party libraries
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';

import store from 'store/';
import PasswordReset from './index';

const withProvider = (story) => (
  <Provider store={store}>
    { story() }
  </Provider>
);

storiesOf('Password Update', module)
  .addDecorator(withProvider)
  .add('Password update Form', () => <PasswordReset />);
