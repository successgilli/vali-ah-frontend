// react libraries
import React from 'react';

// components
import Message from './index';

describe('Message component', () => {
  it('should renders properly', () => {
    const message = mount(<Message active />);

    expect(message.find('.message')).toHaveLength(1);
    expect(message.find('.header')).toHaveLength(1);
  });

  it('should close message', () => {
    const message = mount(<Message active />);

    message.find('.icon').simulate('click');

    const newState = message.state();

    expect(newState).toEqual({ active: false, close: false });
  });
});
