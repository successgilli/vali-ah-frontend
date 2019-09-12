import React from 'react';

import CardContainer from './index';


describe('CardContainer Component', () => {
  it('should renders properly without card data', () => {
    const cardContainer = mount(<CardContainer />);

    expect(cardContainer).toMatchSnapshot();
  });

  it('should renders properly with card data', () => {
    const data = [{
      title: '',
      summary: '',
      category: ''
    }];
    const CardComponent = () => () => <span>MultiSelect</span>;
    const cardContainer = mount(<CardContainer cardData={data} CardComponent={CardComponent} />);

    expect(cardContainer).toMatchSnapshot();
  });
});
