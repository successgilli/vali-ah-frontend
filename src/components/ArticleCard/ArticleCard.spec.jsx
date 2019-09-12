import React from 'react';

import ArticleCard from './index';


describe('ArticleCard Component', () => {
  it('should mount the artcile card wrapper', () => {
    const wrapper = shallow(<ArticleCard />);

    expect(wrapper.find('.card-wrapper')).toBeDefined();
  });
});
