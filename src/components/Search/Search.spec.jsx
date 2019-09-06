// react libraries
import React from 'react';

// components
import Search from './index';

it('renders properly', () => {
  const wrapper = shallow(<Search searchkeyUp={() => {}} changeValue={() => {}} searchValue="" />);

  expect(wrapper.prop('placeholder')).toEqual('Search for articles');
});
