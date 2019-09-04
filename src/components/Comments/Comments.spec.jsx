import React from 'react';
import { Provider } from 'react-redux';

import mockStore from 'fixtures/store';
import {
  articleComments, formProps, noSaving, comments as sampleComments
} from 'fixtures/articleComments';
import Comments, { CommentsComponent } from './index';
import CommentForm from './CommentForm';

const store = mockStore({ articleComments });

describe('Comments Component', () => {
  it('should render properly', () => {
    const comments = mount(<Provider store={store}><Comments articleId="sampleId" /></Provider>);

    expect(comments.find('.Comment')).toBeDefined();
    expect(comments.find('.Comment').find('h3')).toHaveLength(1);
    expect(comments.find('.Comment').find('Comment')).toHaveLength(2);
    expect(comments.find('.Comment').find('CommentForm')).toHaveLength(1);
  });

  it('should change state onChange', () => {
    const comments = mount(<CommentsComponent
      articleId="sampleId"
      comments={sampleComments}
      createCommentRequest={jest.fn()}
      getCommentsRequest={jest.fn()}
      loading={false}
    />);
    const input = comments.find('.ui.comments .form textarea');
    input.instance().value = 'great article!';
    input.simulate('change');

    expect(comments.state().comment).toEqual('great article!');
  });

  it('should disable input on save', () => {
    const comments = mount(<CommentsComponent
      articleId="sampleId"
      comments={sampleComments}
      createCommentRequest={jest.fn()}
      getCommentsRequest={jest.fn()}
      loading={false}
    />);
    const form = comments.find('.ui.comments .form');

    form.simulate('submit');
    expect(comments.find('.ui.comments .form textarea').props().disabled).toBeTruthy();
    expect(comments.props().getCommentsRequest).toHaveBeenCalled();
  });
});

describe('CommentForm Component', () => {
  it('should render properly', () => {
    const commentForm = shallow(<CommentForm {...formProps} />);

    expect(commentForm.find('textarea')).toHaveLength(1);
  });

  it('should render properly without saving parameter', () => {
    const commentForm = shallow(<CommentForm {...noSaving} />);

    expect(commentForm.find('textarea')).toHaveLength(1);
  });

  it('should call handleChange function', () => {
    const commentForm = shallow(<CommentForm {...formProps} />);
    const input = commentForm.find('textarea');

    input.simulate('change');
    expect(formProps.handleChange).toHaveBeenCalled();
  });
});
