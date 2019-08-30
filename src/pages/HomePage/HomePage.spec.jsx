/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import mockStore from 'fixtures/store';
import articles from 'fixtures/articles';

import request from 'modules/userSelection/requests';
import HomePage from './index';


const initialState = {
  userSelection: {
    isLoading: false,
    userSelection: null
  },
  header: { activateModal: '' },
  signup: { success: '', error: '' }
};

const store = mockStore(initialState);

global.FB = {};
global.gapi = {};
global.FB.login = jest.fn();
global.FB.getLoginStatus = (cb) => {
  const res = {
    status: 'connected',
    authResponse: { access_token: 'theAccessToken' }
  };
  cb(res);
};
global.gapi.load = () => {};

describe('Home Page', () => {
  beforeAll(() => {
    request.fetchSelection = jest.fn(() => articles);
  });
  it('should render properly when is loading is false', () => {
    const homePage = mount(
      <Router>
        <Provider store={store}>
          <HomePage {...initialState} />
        </Provider>
      </Router>
    );

    expect(homePage).toMatchSnapshot();
  });
});
