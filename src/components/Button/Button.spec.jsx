// react libraries
import React from 'react';

// components
import Button from './index';

it('renders properly', () => {
  const wrapper = shallow(<Button text="Good" />);

  expect(wrapper.find('button').text()).toEqual('Good');
});
