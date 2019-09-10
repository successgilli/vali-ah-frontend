// react libraries
import React from 'react';

// third-party libraries
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// components
import LinkButton from './index';

storiesOf('LinkButton', module)
  .add('with tag text', () => <LinkButton text="tag" onClick={action('clicked')} className="search-container__query-button-tag" />)
  .add('with author text', () => <LinkButton text="author" onClick={action('clicked')} className="search-container__query-button-author" />)
  .add('with title text', () => <LinkButton text="title" onClick={action('clicked')} className="search-container__query-button-title" />)
  .add('with keyword text', () => <LinkButton text="keyword" onClick={action('clicked')} className="search-container__query-button-keyword" />)
  .add('without classname prop', () => <LinkButton text="no class" onClick={action('some action')} />);
