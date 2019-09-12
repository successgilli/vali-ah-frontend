import React from 'react';

import ButtonWithIcont from './index';

describe('ButtonWithIcon Component', () => {
  it('should renders properly', () => {
    const button = mount(<ButtonWithIcont />);

    expect(button.find('.ui')).toBeDefined();
    expect(button.props().icon).toBe('add');
  });
});
