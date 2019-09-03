import * as React from 'react';

// // third-party libraries
import { Provider } from 'react-redux';

import { storiesOf } from '@storybook/react';

import store from 'store/';
import PasswordReset from './index';

const header = <h5>Form Header</h5>;
const fields = [{
  label: 'Email address',
  placeHolder: 'Email address',
  type: 'text',
  name: 'email',
  fieldClass: 'class'
}];

const withProvider = (story) => (
  <Provider store={store}>
    { story() }
  </Provider>
);

storiesOf('Password Reset', module)
  .addDecorator(withProvider)
  .add('Password Reset Form', () => <PasswordReset header={header} fields={fields} />);
