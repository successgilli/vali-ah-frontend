import React from 'react';

import HeroSection from './index';


describe('HeroSection Component', () => {
  it('should renders properly without card data', () => {
    const heroSection = mount(<HeroSection />);

    expect(heroSection).toMatchSnapshot();
  });
});
