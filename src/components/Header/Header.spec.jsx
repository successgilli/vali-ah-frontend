// third-party libraries
import React from 'react';

//  component
import { Header } from './index';

describe('Header', () => {
  const props = {
    search: {
      loading: false,
      data: {},
    },
    history: { location: { search: 'query=author' }, push: jest.fn() },
    searchArticlesRequest: jest.fn(),
  };
  const wrapper = mount(
    <Header {...props}>
      <header className="header" />
    </Header>,
  );

  it('should not render when other keys are pressed', () => {
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: 'author' } });
    input.simulate('keyUp', { keyCode: 11 });

    expect(props.history.push).not.toHaveBeenCalled();
  });

  it('should not render when other keys are pressed', () => {
    const input = wrapper.find('input');

    input.simulate('change', { target: { value: 'author' } });
    input.simulate('keyUp', { keyCode: 13 });

    expect(props.history.push).toHaveBeenCalled();
  });
  it('renders properly', () => {
    expect(wrapper.find('a')).toHaveLength(3);
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('nav')).toHaveLength(1);
  });
});
