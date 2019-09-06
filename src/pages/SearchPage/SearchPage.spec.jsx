// third-party libraries
import React from 'react';

// pages
import { SearchPage } from './index';

describe('Search', () => {
  const props = {
    search: {
      loading: false,
      data: [],
    },
    history: { location: { search: 'query=author' }, push: jest.fn() },
    searchArticlesRequest: jest.fn(),
  };

  const wrapper = mount(
    <SearchPage {...props}>
      <div className="search-container" />
    </SearchPage>,
  );

  it('should renders without crashing', () => {
    expect(wrapper.find('.search-container')).toHaveLength(1);
    expect(wrapper.find('.search-container__search')).toHaveLength(1);
    expect(wrapper.find('.search-container__card-grid')).toHaveLength(1);
    expect(wrapper.find('.card-display')).toHaveLength(0);
  });

  it('should not render when other keys are pressed', () => {
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: 'author' } });
    input.simulate('keyUp', { keyCode: 11 });

    expect(props.history.push).not.toHaveBeenCalled();
  });

  it('should render when the enter key is pressed', () => {
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'author' } });
    input.simulate('keyUp', { keyCode: 13 });

    const newState = wrapper.state();

    expect(newState.searched).toEqual(true);
    expect(newState.query).toEqual('author');
  });

  it('should render when the tag button is clicked', () => {
    const button = wrapper.find('.query-button__tag');
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: 'health' } });
    button.simulate('click');

    const newState = wrapper.state();

    expect(newState.searched).toEqual(true);
    expect(newState.query).toEqual('health');
  });

  it('should render when the title button is clicked', () => {
    const button = wrapper.find('.query-button__title');
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: 'is me' } });
    button.simulate('click');

    const newState = wrapper.state();

    expect(newState.searched).toEqual(true);
    expect(newState.query).toEqual('is me');
  });

  it('should render when the author is clicked', () => {
    const button = wrapper.find('.query-button__author');
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: 'Peter' } });
    button.simulate('click');

    const newState = wrapper.state();

    expect(newState.searched).toEqual(true);
    expect(newState.query).toEqual('Peter');
  });

  it('should render when the keyword button is clicked', () => {
    const button = wrapper.find('.query-button__keyword');
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: 'l' } });
    button.simulate('click');

    const newState = wrapper.state();

    expect(newState.searched).toEqual(true);
    expect(newState.query).toEqual('l');
  });
});
