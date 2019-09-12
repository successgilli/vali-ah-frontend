/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { Provider } from 'react-redux';

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

describe('Home Page', () => {
  beforeAll(() => {
    request.fetchSelection = jest.fn(() => articles);
  });
  it('should renders properly when is loading is false', () => {
    const homePage = mount(<Provider store={store}><HomePage {...initialState} /></Provider>);

    expect(homePage).toMatchSnapshot();
  });
});
