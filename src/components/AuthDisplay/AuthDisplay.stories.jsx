// react libraries
import * as React from 'react';
import { Provider } from 'react-redux';

// third-party libraries
import { storiesOf } from '@storybook/react';

import store from 'store/';

// components
import { AuthDisplay } from './index';

const connectedComponent = (form) => (
  <Provider store={store}>
    <AuthDisplay formType={form} />
  </Provider>
);

storiesOf('AuthDisplay', module)
  .add('Auth content proposed in midal', () => connectedComponent('signup'))
  .add('Auth signin content', () => connectedComponent('signin'));
