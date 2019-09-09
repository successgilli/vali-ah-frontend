// react libraries
import * as React from 'react';

// third-party libraries
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';

import store from 'store/';

// components
import Modal from './index';

storiesOf('Modal', module)
  .add('default signup view', () => (
    <Provider store={store}>
      <Modal show formType={false} />
    </Provider>
  ))
  .add('click closed modal button', () => <Modal show={false} />);
