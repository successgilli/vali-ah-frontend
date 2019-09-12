import React from 'react';

import Masonry from './index';


describe('Masonry Component', () => {
  it('should renders properly without card data', () => {
    const masonrySection = mount(
      <Masonry>
        <span>Span 1</span>
        <span>Span 1</span>
        <span>Span 1</span>
      </Masonry>
    );

    expect(masonrySection).toMatchSnapshot();
  });
});
