// react libraries
import * as React from 'react';

// third-party libraries
import { storiesOf } from '@storybook/react';

// components
import { ModalContent } from './index';


storiesOf('ModalContent', module)
  .add('click closed modal button', () => <ModalContent />);
