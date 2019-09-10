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

  it('should render the tag, title, author and keyword buttons', () => {
    expect(wrapper.find('.search-container')).toHaveLength(1);
    expect(wrapper.find('button.search-container__query-button-tag')).toHaveLength(1);
    expect(wrapper.find('button.search-container__query-button-title')).toHaveLength(1);
    expect(wrapper.find('button.search-container__query-button-author')).toHaveLength(1);
    expect(wrapper.find('button.search-container__query-button-keyword')).toHaveLength(1);
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

  it('should update the state to filter articles based on their tag', () => {
    const button = wrapper.find('button.search-container__query-button-tag');
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: 'health' } });
    button.simulate('click');

    const newState = wrapper.state();

    expect(newState.searched).toEqual(true);
    expect(newState.query).toEqual('health');
  });

  it('should update the state to filter articles based on their title', () => {
    const button = wrapper.find('button.search-container__query-button-title');
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: 'is me' } });
    button.simulate('click');

    const newState = wrapper.state();

    expect(newState.searched).toEqual(true);
    expect(newState.query).toEqual('is me');
  });

  it('should update the state to filter articles based on their author', () => {
    const button = wrapper.find('button.search-container__query-button-author');
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: 'Baz' } });
    button.simulate('click');

    const newState = wrapper.state();

    expect(newState.searched).toEqual(true);
    expect(newState.query).toEqual('Baz');
  });

  it('should update the state to filter articles based on keyword', () => {
    const button = wrapper.find('button.search-container__query-button-keyword');
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: 'l' } });
    button.simulate('click');

    const newState = wrapper.state();

    expect(newState.searched).toEqual(true);
    expect(newState.query).toEqual('l');
  });
});
