// react libraries
import * as React from 'react';

// third-party libraries
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// components
import Button from './index';

storiesOf('Button', module)
  .add('with submit text', () => <Button text="Submit" onClick={action('submitted')} classname="primary" />)
  .add('with Login text', () => <Button text="Sign In" onClick={action('Loggedin')} classname="primary" />)
  .add('add custom class', () => <Button text="auth" onClick={action('do something')} classname="round" />)
  .add('without classname prop', () => <Button text="no class" onClick={action('some action')} />);
