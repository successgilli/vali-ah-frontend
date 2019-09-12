// react libraries
import React from 'react';
import { shallow } from 'enzyme';

import { SignupComponent } from './index';

describe('Signup', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      createUserRequest: jest.fn(),
      signup: { success: '', error: '', isRequesting: false }
    };
    wrapper = shallow(<SignupComponent
      createUserRequest={jest.fn()}
      signup={props.signup}
    />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('getDerivedStateFromProps', () => {
    it('should show div containing success message', () => {
      wrapper.setProps({
        ...props,
        signup: {
          ...props.signup,
          success: 'Success Message'
        }
      });
      const showMessageDiv = wrapper.find({ id: 'shwMessage' });

      expect(showMessageDiv.exists()).toBe(true);
    });
  });
  describe('Signup loader', () => {
    it('should show loader when request is true', () => {
      wrapper.setProps({
        ...props,
        signup: {
          ...props.signup,
          isRequesting: true
        }
      });
      const loaderWrapper = wrapper.find('.loader-wrapper');

      expect(loaderWrapper.exists()).toBe(true);
    });
  });
  describe('handleSubmit', () => {
    const state = {
      errors: {}
    };
    describe('if there are no errors', () => {
      const event = {
        preventDefault() {},
        target: { firstName: 'vali', lastName: 'vali' }
      };
      it('should call "createUserRequest" method', () => {
        wrapper.instance().handleInput(event);
        wrapper.setState({
          ...state
        });
        wrapper.find('form').simulate('onSubmit', { preventDefault: jest.fn() });

        expect(true).toBe(true);
      });
    });

    describe('if there are errors', () => {
      it('should call "createUserRequest" method', () => {
        wrapper.setState({
          ...state,
          errors: {
            ...state.errors,
            password: 'error in password'
          }
        });
        wrapper.find('form').simulate('onSubmit', { preventDefault: jest.fn() });

        expect(props.createUserRequest).not.toHaveBeenCalled();
      });
    });

    describe('', () => {
      const event = {
        preventDefault() {},
        target: {
          firstName: 'vali',
          lastName: 'vali',
          userName: 'vali',
          email: 'vali@gmail.com',
          password: 'p',
          confirmPassword: 'password'
        }
      };
      it('should handle submit', () => {
        wrapper.instance().handleSubmit(event);
        wrapper.setState({
          ...state,
          errors: {
            ...state.errors,
            password: 'error in password'
          }
        });
        wrapper.find('form').simulate('onSubmit', { preventDefault: jest.fn() });

        expect(props.createUserRequest).not.toHaveBeenCalled();
      });
    });
  });
});
