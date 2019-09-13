// react libraries
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

// components
import App from './index';

global.FB = {};
global.gapi = {};
global.gapi.load = jest.fn();

it('renders properly', () => {
  const wrapper = shallow(<MemoryRouter><App /></MemoryRouter>);

  expect(wrapper.find('Header')).toBeTruthy();
});

it('should render not found for invalid route', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/notFound']} initialIndex={0}>
      <App />
    </MemoryRouter>
  );
  expect(wrapper.contains(<h3>This page is not found.</h3>)).toBe(true);
});

it('should visit the password reset page', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/password-reset']} initialIndex={0}>
      <App />
    </MemoryRouter>
  );

  expect(wrapper.contains(<div>This is the password reset page.</div>)).toBe(true);
});

it('should visit the user feed page', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/login']} initialIndex={0}>
      <App />
    </MemoryRouter>
  );

  expect(wrapper.contains(<div>Your are currently logged in.</div>)).toBe(true);
});
