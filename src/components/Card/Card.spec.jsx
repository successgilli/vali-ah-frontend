// third-party libraries
import React from 'react';
import { shallow } from 'enzyme';

//  component
import Card from './index';

describe('Card', () => {
  it('should output the correct value of the title props', () => {
    const wrapper = shallow(<Card img="" tag="" title="just a title" summary="" author="" date="" slug="" />);
    const title = wrapper.find('.header').at(1);
    expect(title.text()).toBe('just a title');
  });

  it('should output the correct value of the title props', () => {
    const wrapper = shallow(<Card img="" tag="" title="" summary="a summary" author="" date="" slug="" />);
    const summary = wrapper.find('.description p');
    expect(summary.text()).toBe('a summary');
  });
});
