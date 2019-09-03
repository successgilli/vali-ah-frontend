import * as React from 'react';

// third-party libraries
import { storiesOf } from '@storybook/react';

// components
import Form from './index';

const header = <h5>Form Header</h5>;
const fields = [{
  label: 'Email address',
  placeHolder: 'Email address',
  type: 'text',
  name: 'email',
  fieldClass: 'class'
}];

storiesOf('Form', module)
  .add('Without header', () => <Form fields={fields} />)
  .add('With header', () => <Form header={header} fields={fields} />);
