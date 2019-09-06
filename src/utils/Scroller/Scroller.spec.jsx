import React from 'react';

import { shallow } from 'enzyme';

import Scroller from './index';

class ScrollExtender extends Scroller {
  fetch() {
    this.things = {};
    return 'smething';
  }

  render() {
    return null;
  }
}

const wrapper = shallow(<ScrollExtender />);

describe('Scroller ', () => {
  it('should fetch and update page count when it mounts', () => {
    expect(wrapper.instance().page).toEqual(2);
  });

  it('should not update page if scroll has not reached required position', () => {
    window.scrollY = -100000000;

    wrapper.instance().handleScroll();
    wrapper.instance().handleScroll();

    expect(wrapper.instance().page).toEqual(2);
  });

  it('should only fetch articles and update page when scroll gets to the expected height', () => {
    window.scrollY = 100000;
    wrapper.instance().handleScroll();
    wrapper.instance().handleScroll();

    expect(wrapper.instance().page).toEqual(4);
  });
});
