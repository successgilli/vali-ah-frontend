import React from 'react';

import CreateComment from './index';

describe('Create Component', () => {
  it('should renders properly', () => {
    const comment = mount(<CreateComment />);

    expect(comment.find('.ui')).toBeDefined();
    expect(comment.props().icon).toBe('add');
  });
});
