// react libraries
import React from 'react';

// components
import { ModalComponent } from './index';

describe('Modal', () => {
  it('should render the signup component on mount', () => {
    const wrapper = shallow(<ModalComponent show />);

    expect(wrapper.state().show).toBe(true);
  });

  it('should toggle and display the signin component on signin link click', () => {
    const wrapper = mount(<ModalComponent show />);
    const button = wrapper.find('div div button').at(0);
    button.simulate('click');

    expect(wrapper.state().show).toBe(false);
  });
});
