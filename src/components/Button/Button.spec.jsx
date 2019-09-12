// react libraries
import React from 'react';

// components
import Button from './index';

const text = 'Signup';

it('renders properly', () => {
  const wrapper = shallow(<Button>{text}</Button>);

  expect(wrapper.find('button').text()).toEqual('Signup');
});
