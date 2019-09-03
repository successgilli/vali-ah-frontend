import React from 'react';

import { Provider } from 'react-redux';

import mockStore from 'fixtures/store';

import PasswordReset from './index';

const store = mockStore({ passwordResetRequest: {} });

describe('Form component', () => {
  it('should renders properly', () => {
    const form = mount(<Provider store={store}><PasswordReset /></Provider>);

    expect(form.find('.password-reset')).toHaveLength(1);
    expect(form.find('span')).toHaveLength(2);
    expect(form.find('Form')).toHaveLength(1);
  });

  it('should handle form submission', () => {
    const preventDefault = sinon.spy();
    const match = { params: {} };
    const location = { search: {} };
    const form = mount(
      <Provider store={store}><PasswordReset match={match} location={location} /></Provider>
    );
    const event = { target: { name: 'password', value: 'password' }, preventDefault };
    const confirmPasswordEvent = { target: { name: 'confirmPassword', value: 'password' }, preventDefault };


    form.find('input[name="password"]').simulate('change', event);
    form.find('input[name="confirmPassword"]').simulate('change', confirmPasswordEvent);
    form.find('.button').simulate('click');

    expect(preventDefault.calledTwice).toEqual(true);
  });
});
