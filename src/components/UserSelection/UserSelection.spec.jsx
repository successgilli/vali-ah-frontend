import React from 'react';

import { Provider } from 'react-redux';

import mockStore from 'fixtures/store';
import categories from 'fixtures/categories';

import UserSelectionForm from './index';

const store = mockStore({});

describe('UserSelectionForm Component', () => {
  it('should renders properly', () => {
    const articleCategories = mount(
      <Provider store={store}>
        <UserSelectionForm selectionOptions={categories} />
      </Provider>
    );

    expect(articleCategories.find('form')).toBeDefined();
    expect(articleCategories.find('input[type="radio"]')).toHaveLength(8);
  });

  it('should reverse votetype', () => {
    const articlesCategory = mount(
      <Provider store={store}>
        <UserSelectionForm selectionOptions={categories} />
      </Provider>
    );
    articlesCategory.find('#motivation').simulate('click');
  });
});
