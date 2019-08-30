// react libraries
import React from 'react';
import { shallow } from 'enzyme';

import { ModalComponent } from './index';

describe('Modal', () => {
  it('should render the signup component on mount', () => {
    const wrapper = shallow(<ModalComponent formType={false} show />);
    const text = wrapper.find('div div div h1');

    expect(wrapper.state().show).toBe(true);
    expect(text.text()).toBe('Create your free account');
  });

  it('should toggle and display the signin component on signin link click', () => {
    const wrapper = shallow(<ModalComponent formType={false} show />);
    const button = wrapper.find('button').at(1);
    button.simulate('click');
    const text = wrapper.find('div div div h1');

    expect(wrapper.state().show).toBe(true);
    expect(text.text()).toBe('Welcome back');
  });

  it('should close modal on click', () => {
    const wrapper = shallow(<ModalComponent formType={false} show />);
    const button = wrapper.find('button').at(0);
    button.simulate('click');

    expect(wrapper.state().signin).toBe(false);
  });
});
