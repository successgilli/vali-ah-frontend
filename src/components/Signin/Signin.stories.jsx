// react libraries
import * as React from 'react';

// third-party libraries
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';

import store from 'store/';

// components
import Signin from './index';

storiesOf('Signin', module)
  .add('sign in form', () => (
    <Provider store={store}>
      <Signin show formType />
    </Provider>
  ));
