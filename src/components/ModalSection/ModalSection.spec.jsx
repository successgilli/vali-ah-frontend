import React from 'react';

import { Provider } from 'react-redux';

import mockStore from 'fixtures/store';

import ModalSectionComponent from './index';

const store = mockStore({});

describe('ModalSectionComponent Component', () => {
  it('should renders properly when is loading is false', () => {
    const modalSection = mount(
      <Provider store={store}>
        <ModalSectionComponent userSelection={{ isLoading: false }} />
      </Provider>
    );

    expect(modalSection).toMatchSnapshot();
  });

  it('should renders properly when is loading is true', () => {
    const modalSection = mount(
      <Provider store={store}>
        <ModalSectionComponent userSelection={{ isLoading: true }} />
      </Provider>
    );

    expect(modalSection).toMatchSnapshot();
  });
});
