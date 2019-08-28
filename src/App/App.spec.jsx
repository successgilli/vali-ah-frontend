// react libraries
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

// components
import App from './index';

it('renders properly', () => {
  const wrapper = shallow(<MemoryRouter><App /></MemoryRouter>);

  expect(wrapper.find('Header')).toBeTruthy();
});
