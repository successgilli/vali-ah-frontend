/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
// react libraries
import React, { cloneElement, createRef } from 'react';

import PropTypes from 'prop-types';

import CreateInlineComment from 'components/ButtonWithIcon';
import InlineCommentForm from 'components/InlineCommentForm';

// utils
import connect from 'utils/connect';

import './InlineComment.scss';

export class InlineComment extends React.Component {

  constructor(props) {
    super(props);
    this.parentRef = props.parentRef;
    this.state = { highlightIndex: {}, formOpen: false, currentRange: null };
  }

  componentDidMount() {
    this.clonedElement = this.parentRef.current.innerHTML;
    window.onmouseup = this.handleTextHightlight.bind(this);
  }

  getHighlightTextIndex(nodeToSearch) {
    const replaceRegex = new RegExp(/<section.*>(.*)<\/section>/, 'g');
    const wrapper = document.createElement('div');
    wrapper.appendChild(nodeToSearch.cloneNode(true));

    const textToSearch = wrapper.innerHTML.replace(replaceRegex, '$1');

    const container = document.getElementById('article-content');
    const containerContent = container.innerHTML.replace(replaceRegex, '$1');

    const textStartIndex = containerContent.indexOf(textToSearch);

    return { start: textStartIndex, end: textStartIndex + textToSearch.length };
  }

  getCommentPosition = (range) => {
    const rect = range.getClientRects()[0];
    return {
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      x: rect.x,
      y: rect.y
    };
  };

  restoreParentDom() {
    this.parentRef.current.innerHTML = this.clonedElement;
    this.setState({currentRange: null});
  }
  positionCommentComponent(range) {
    const rangePosition = this.getCommentPosition(range);
    const { top, x } = rangePosition;

    const windowTop = (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0);
    const positionTop = windowTop + top;

    this.setState({ createCommentTop: `${positionTop}px`, createCommentLeft: `${x + (x / 2)}px` });
  }

  handleTextHightlight(evt) {
    const { currentRange } = this.state;
    console.log(evt.target);
    if (currentRange) this.restoreParentDom();
    if (!window.getSelection) return;

    const selection = window.getSelection();
    if (Math.abs(selection.focusOffset - selection.anchorOffset) < 30) return;
    const contentHighlighted = selection.getRangeAt(0).extractContents();
    const cloneRange = selection.getRangeAt(0).cloneRange();

    cloneRange.collapse();

    const spanNode = document.createElement('section');
    spanNode.appendChild(contentHighlighted);
    spanNode.style.cssText = 'background-color:red;display:inline';

    cloneRange.insertNode(spanNode);

    const highlightIndex = this.getHighlightTextIndex(spanNode);

    this.setState({ highlightIndex, currentRange: cloneRange });

    this.positionCommentComponent(cloneRange);
  }

  openCommentForm = () => {
    this.setState(({ formOpen }) => ({
      formOpen: !formOpen
    }));
  }

  render() {
    const { createCommentLeft, createCommentTop } = this.state;
    const style = { position: 'absolute', top: createCommentTop, left: createCommentLeft };

    return (
      <>
        <InlineCommentForm style={style} />
      </>
    );
  }
}

export default connect({ })(InlineComment);
