// react libraries
import React from 'react';

// components
import { FeedCard } from './index';

describe('FeedCard', () => {
  it('renders properly', () => {
    const wrapper = shallow(<FeedCard />);
    expect(wrapper.find('img')).toHaveLength(2);
  });
});
