/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import getTestData from 'fixtures/inlineComments';

import { InlineComment } from './index';


describe('Create Component', () => {
  beforeEach(() => {
    if (document.createElement.restore) document.createElement.restore();
  });
  it('should match snapshot', () => {
    const { props } = getTestData();
    const inlineComment = mount(<InlineComment {...props} />);

    expect(inlineComment).toMatchSnapshot();
  });

  it('should update dom if comment was added successfully', () => {
    const { props, currentRange } = getTestData();
    props.inlineComment.commented = true;

    const comment = mount(<InlineComment {...props} />);
    comment.setState({ currentRange });

    comment.update();

    expect(props.resetCommentState).toBeCalled();
  });

  it('should restore dom if error occured', () => {
    const { props, currentRange } = getTestData();
    props.inlineComment.error = true;

    const comment = mount(<InlineComment {...props} />);
    comment.setState({ currentRange });

    comment.update();

    expect(currentRange.deleteContents).toBeCalled();
    expect(currentRange.insertNode).toBeCalled();
  });

  it('should create comment on submit', () => {
    const { props, currentRange, documentMock } = getTestData();

    const comment = mount(<InlineComment {...props} />);
    comment.setState({ currentRange, showForm: true });

    comment.update();

    comment.find('ButtonWithIcon').simulate('click');
    comment.update();
    sinon.stub(document, 'createElement').returns(documentMock);

    comment.find('Button').simulate('click');

    expect(props.createInlineCommentDispatch).toBeCalled();
  });

  it('should handleTextHighlight if all conditions are met', () => {
    const { props, currentRange, windowMock } = getTestData();

    const comment = mount(<InlineComment {...props} />);
    const handler = comment.instance();

    comment.setState({ currentRange });
    comment.update();

    window.getSelection = windowMock.getSelection;

    handler.handleTextHightlight();
    comment.update();

    expect(comment.state().showForm).toBe(true);
    expect(comment.state().currentRange).toBeDefined();
  });

  it('should return if window.getSelection is undefined', () => {
    const { props } = getTestData();

    const comment = mount(<InlineComment {...props} />);
    const handler = comment.instance();

    window.getSelection = null;

    const response = handler.handleTextHightlight();
    comment.update();

    expect(comment.state().showForm).toBe(false);
    expect(comment.state().currentRange).toBe(null);
    expect(response).toBeUndefined();
  });

  it('should return if selected text is less than 20 chars', () => {
    const { props, windowMock } = getTestData();
    windowMock.focusOffset = 30;

    const comment = mount(<InlineComment {...props} />);
    const handler = comment.instance();

    window.getSelection = windowMock.getSelection;

    const response = handler.handleTextHightlight();
    comment.update();

    expect(comment.state().showForm).toBe(false);
    expect(comment.state().currentRange).toBe(null);
    expect(response).toBeUndefined();
  });
});
