// react libraries
import React from 'react';

// components
import { AuthDisplay } from './index';

describe('Modal', () => {
  it('should render the signup component on mount', () => {
    const wrapper = shallow(<AuthDisplay formType="signin" />);
    const text = wrapper.find('div h1');

    expect(text.text()).toBe('Create your free account');
  });

  it('should toggle and display the signin/signup components on link click', () => {
    const wrapper = shallow(<AuthDisplay formType="signin" />);
    let button = wrapper.find('button');

    button.simulate('click');

    let text = wrapper.find('div h1');

    expect(text.text()).toBe('Welcome back');

    button = wrapper.find('button');

    button.simulate('click');

    text = wrapper.find('div h1');

    expect(text.text()).toBe('Create your free account');
  });
});
