import React from 'react';

import InlineCommentForm from './index';

describe('Create Component', () => {
  it('should renders properly', () => {
    const comment = mount(<InlineCommentForm />);

    expect(comment.find('.comment-form')).toBeDefined();
    expect(comment.find('textarea')).toBeDefined();
    expect(comment.find('button')).toBeDefined();
  });
  it('should remove comment button if not creating a comment', () => {
    const comment = mount(<InlineCommentForm isCreating={false} />);

    expect(comment.find('.comment-form')).toBeDefined();
    expect(comment.find('textarea')).toBeDefined();
    expect(comment.find('button').exists()).toBe(false);
  });
});
