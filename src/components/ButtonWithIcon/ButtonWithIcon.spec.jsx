import React from 'react';

import ButtonWithIcon from './index';

describe('ButtonWithIcon Component', () => {
  it('should renders properly', () => {
    const button = mount(<ButtonWithIcon />);

    expect(button.find('.ui')).toBeDefined();
    expect(button.props().icon).toBe('add');
  });
});
