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

  it('should call the createComment handler on click', () => {
    const createComment = jest.fn();
    const comment = mount(<InlineCommentForm isCreating createComment={createComment} />);

    comment.find('ButtonWithIcon').simulate('click');
    comment.update();
    comment.find('button').simulate('click');

    expect(createComment).toBeCalled();
  });

  it('should display loader is isLoading is true', () => {
    const createComment = jest.fn();
    const comment = mount(<InlineCommentForm isCreating isLoading createComment={createComment} />);

    comment.find('ButtonWithIcon').simulate('click');
    comment.update();
    comment.find('button').simulate('click');

    expect(createComment).toBeCalled();
    expect(comment.find('.loader')).toBeDefined();
  });
});
