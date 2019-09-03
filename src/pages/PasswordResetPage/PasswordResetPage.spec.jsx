import React from 'react';

import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import mockStore from 'fixtures/store';

import PasswordResetPage from './index';

const store = mockStore({ passwordResetRequest: {} });

describe('Password Reset Page', () => {
  it('should renders password reset page', () => {
    const page = mount(<Provider store={store}><MemoryRouter initialEntries={['/password-reset']} initialIndex={0}><PasswordResetPage /></MemoryRouter></Provider>);

    expect(page.find('Message')).toHaveLength(1);
    expect(page.find('PasswordResetComponent')).toHaveLength(1);
  });

  it('should renders password update page', () => {
    const page = mount(<Provider store={store}><MemoryRouter initialEntries={['/password-reset/id']} initialIndex={0}><PasswordResetPage /></MemoryRouter></Provider>);

    expect(page.find('Message')).toHaveLength(1);
    expect(page.find('PasswordUpdateComponent')).toHaveLength(1);
  });
});
