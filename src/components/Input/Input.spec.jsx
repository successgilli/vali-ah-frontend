import React from 'react';

import Input from './index';

describe('Input component', () => {
  it('should render properly', () => {
    const input = shallow(<Input onChange={() => {}} />);

    expect(input.find('input')).toHaveLength(1);
  });

  it('check validity of props', () => {
    const input = mount(<Input type="text" onChange={() => {}} />);

    expect(input.props().onChange).toBeInstanceOf(Function);
  });

  it('validates name props ', () => {
    const input = mount(<Input name="email" type="text" onChange={() => {}} />);

    expect(input.props().name).toBe('email');
  });
});
