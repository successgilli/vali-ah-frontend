import React from 'react';

import { Provider } from 'react-redux';

import mockStore from 'fixtures/store';

import PasswordReset from './index';

const store = mockStore({ passwordResetRequest: {} });
describe('Form component', () => {
  it('should renders properly', () => {
    const form = mount(<Provider store={store}><PasswordReset /></Provider>);

    expect(form.find('.password-reset')).toHaveLength(1);
    expect(form.find('span')).toHaveLength(3);
    expect(form.find('Form')).toHaveLength(1);
  });

  it('should handle form submission', () => {
    const preventDefault = sinon.spy();
    const match = { params: {} };
    const form = mount(<Provider store={store}><PasswordReset match={match} /></Provider>);
    const event = { target: { name: 'email', value: 'email@example.com' }, preventDefault };

    form.find('input[name="email"]').simulate('change', event);
    form.find('.button').simulate('click');

    expect(preventDefault.calledOnce).toEqual(true);
  });
});
