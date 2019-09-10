// react libraries
import React from 'react';

// components
import Search from './index';

describe('Search', () => {
  it('renders properly', () => {
    const wrapper = shallow(<Search searchkeyUp={() => {}} changeValue={() => {}} searchValue="" />);

    expect(wrapper.prop('placeholder')).toEqual('Search for articles');
  });

  it('should return the correct value for searchValue', () => {
    const wrapper = shallow(<Search searchkeyUp={() => {}} changeValue={() => {}} searchValue="hello" />);

    expect(wrapper.prop('value')).toEqual('hello');
  });

  it('fires onChange', () => {
    const keyHandler = jest.fn();
    const wrapper = shallow(<Search changeValue={keyHandler} />);

    wrapper.find('input').simulate('change', { target: { value: 'john.doe' } });

    expect(keyHandler).toBeCalled();
  });

  it('fires onKeyUp', () => {
    const keyHandler = jest.fn();
    const wrapper = shallow(<Search searchkeyUp={keyHandler} />);

    wrapper.find('input').simulate('keyUp', { key: 'l' });

    expect(keyHandler).toBeCalled();
  });
});
