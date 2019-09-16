import React from 'react';

import { commentData } from 'fixtures/inlineComments';

import InlineCommentCard from './index';

describe('Create Component', () => {
  it('should renders empty children if no commentdata', () => {
    const comment = mount(<InlineCommentCard />);

    expect(comment.children()).toHaveLength(0);
  });

  it('should renders when comment data is supplied', () => {
    const comment = mount(<InlineCommentCard comments={commentData} />);

    expect(comment.find('.card').length).toBeGreaterThan(1);
  });
});
