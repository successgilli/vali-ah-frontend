// react libraries
import * as React from 'react';

// third-party libraries
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// components
import Button from './index';

storiesOf('Button', module)
  .add('with submit text', () => <Button onClick={action('submitted')} className="button__primary">Submit</Button>)
  .add('with Login text', () => <Button onClick={action('Loggedin')} className="button__primary">Sign In</Button>)
  .add('add custom class', () => <Button onClick={action('do something')} className="button__round">auth</Button>)
  .add('without classname prop', () => <Button onClick={action('some action')}>no class</Button>);
