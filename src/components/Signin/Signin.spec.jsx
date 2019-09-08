import React from 'react';
import { shallow, mount } from 'enzyme';

import { SigninComponent } from './index';

describe('SigninComponent', () => {
  it('should default inputs fields to empty string', () => {
    const wrapper = shallow(<SigninComponent login={{ loginError: {}, isLoggedIn: 'false' }} />);

    expect(wrapper.state().email).toBe('');
    expect(wrapper.state().password).toBe('');
  });

  it('should update state when inputs change', () => {
    const wrapper = mount(<SigninComponent login={{ loginError: {}, isLoggedIn: 'false' }} />);
    const input = wrapper.find('form label input').at(0);
    input.instance().value = 'hi';
    input.simulate('change');

    expect(wrapper.props().login.isLoggedIn).toBe('false');
    expect(wrapper.state().email).toBe('hi');
    expect(wrapper.state().password).toBe('');
  });

  it('should submit form on click', () => {
    const requestLogin = jest.fn();
    const wrapper = mount(<SigninComponent login={{ loginError: {}, isLoggedIn: 'false' }} requestLogin={requestLogin} />);
    const form = wrapper.find('form');
    wrapper.setState({ email: 'successgilli@gmail', password: 'passwordd' });
    form.simulate('submit');

    expect(wrapper.props().login.isLoggedIn).toBe('false');
    expect(requestLogin).toHaveBeenCalledTimes(1);
    expect(requestLogin).toHaveBeenCalledWith({ email: 'successgilli@gmail', password: 'passwordd' });
  });

  it('should return errors in divs if any found in store', () => {
    const wrapper = mount(<SigninComponent login={{ loginError: { error: 'invalid user' }, requestLogin: () => ({}), isLoggedIn: 'false' }} />);
    const errorDiv = wrapper.find('section div');

    expect(wrapper.props().login.isLoggedIn).toBe('false');
    expect(errorDiv.props().className).toBe('error');
    expect(errorDiv.name()).toBe('div');
  });

  it('should display loader when signinComponent is clicked', () => {
    const wrapper = mount(<SigninComponent login={{ loginError: { error: 'invalid user' }, requestLogin: () => ({}), isLoggedIn: 'loading' }} />);

    expect(wrapper.props().login.isLoggedIn).toBe('loading');
  });

  it('should display success message if login is successful', () => {
    const wrapper = mount(<SigninComponent login={{ loginError: { error: 'invalid user' }, requestLogin: () => ({}), isLoggedIn: 'true' }} />);
    const message = wrapper.find('div').at(0);

    expect(message.text()).toBe('SIGNIN SUCCESSFUL !');
    expect(wrapper.props().login.isLoggedIn).toBe('true');
  });
});
