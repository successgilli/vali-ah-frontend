// react libraries
import React from 'react';
import PropTypes from 'prop-types';

// third party libraries
import { Parser } from 'html-to-react';

// components
import InlineCommentForm from 'components/InlineCommentForm';
import InlineCommentCard from 'components/InlineCommentCard';
import Message from 'components/Message';

// utils
import connect from 'utils/connect';

// modules
import { createInlineComment, clearInlineCommentState, getInlineComments } from 'modules/inlineComment';

// validation
import Validator from 'utils/validator';
import validationRule from '../../validation/inlineComment';

import './InlineComment.scss';

/**
 * Component for Inline Comment
 * @summary base component that handles all inline comment related activities.
 * It handles comment creation and reading
 */
export class InlineComment extends React.Component {
  /**
    * @name InlineComment propTypes
    * @type {propTypes}
    *
    * @param {Object} props - React PropTypes
    *
    * @property {Object} parentRef - reference of the parent component
    * @property {Function} updateArticle - callback to update the parent dom
    * @property {string} articleId - id of the article to comment on
    * @property {Function} resetCommentState - dispatch action to reset the comment state
    * @property {Function} createInlineCommentDispatch - dispatch action to create inline comment
    * @property {Object} inlineComment - object that holds the store state
    *
    */
  static propTypes = {
    parentRef: PropTypes.isRequired,
    updateArticle: PropTypes.func.isRequired,
    articleId: PropTypes.string.isRequired,
    resetCommentState: PropTypes.func.isRequired,
    createInlineCommentDispatch: PropTypes.func.isRequired,
    inlineComment: PropTypes.isRequired,
    getInlineCommentsDispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.parentRef = props.parentRef;
    this.state = {
      currentRange: null, showForm: false
    };
  }

  componentDidMount() {
    const { getInlineCommentsDispatch, articleId } = this.props;

    getInlineCommentsDispatch(articleId);

    this.clonedElement = this.parentRef.current.innerHTML;
    this.parentRef.current.onmouseup = this.handleTextHightlight.bind(this);
  }

  /**
   * Gets the index of the highlighted text
   *
   * @method
   * @param {Node} nodeToSearch - node of highlighted text
   *
   * @returns {Object} - object containing the startIndex and endIndex
   */
  getHighlightTextIndex(nodeToSearch) {
    const replaceRegex = new RegExp(/<section.*>(.*)<\/section>/, 'g');
    const wrapper = document.createElement('div');
    wrapper.appendChild(nodeToSearch.cloneNode(true));

    const textToSearch = wrapper.innerHTML.replace(replaceRegex, '$1');
    const containerContent = this.parentRef.current.innerHTML.replace(replaceRegex, '$1');
    const textStartIndex = containerContent.indexOf(textToSearch);

    return { startIndex: textStartIndex, endIndex: textStartIndex + textToSearch.length };
  }

  /**
   * Gets the position of the highlighted text using range
   *
   * @method
   * @param {Object} range - range of highlighted text. an instance of Range
   *
   * @returns {Object} - object containing the clientRect positions
   */

  getCommentPosition = (range) => {
    const [rect] = range.getClientRects();
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

  /**
   * Restores the parent article dom using the parentRef
   *
   * @returns {void}
   */
  restoreParentDom = () => {
    const { updateArticle } = this.props;

    this.setState({ currentRange: null, showForm: false });
    // console.log(this.state.currentRange, this.clonedElement, this.parentRef.current.innerHTML);

    const htmlToReactParser = new Parser();
    const reactElement = htmlToReactParser.parse(this.clonedElement);
    // console.log(reactElement);
    updateArticle(reactElement, this.clonedElement);
  }

  /**
   * Sets the state for the position of the commit form
   * @param {Object} range - range of highlighted text. an instance of Range
   *
   * @returns {void}
   */
  positionCommentComponent = (range) => {
    const rangePosition = this.getCommentPosition(range);
    const { top, x } = rangePosition;

    const windowTop = (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0);
    const positionTop = windowTop + top;

    this.setState({ createCommentTop: `${positionTop}px`, createCommentLeft: `${x * 5}px` });
  }

  /**
   * Event handler to listen for mouse event for highlight
   *
   * @returns {void}
   */
  handleTextHightlight = () => {
    const { currentRange } = this.state;
    if (currentRange) this.setState({ showForm: false });
    if (!window.getSelection) return;

    const selection = window.getSelection();

    if (Math.abs(selection.focusOffset - selection.anchorOffset) < 20) return;

    const contentHighlighted = selection.getRangeAt(0).cloneContents();
    const cloneRange = selection.getRangeAt(0).cloneRange();

    this.setState({ contentHighlighted, currentRange: cloneRange, showForm: true });
    this.positionCommentComponent(cloneRange);
  }

  /**
   * Creates the comment
   *
   * @param {string} content - the content of the comment
   *
   * @returns {void}
   */
  createComment = (content) => {
    const { inlineCommentValidation } = validationRule;
    const inlineCommentValidator = new Validator(inlineCommentValidation);

    const { isValid, ...errors } = inlineCommentValidator.validate({ content });
    const newErrors = errors;
    // this.setState({ ValidationErrors: newErrors });
    // console.log(isValid);

    // if (!isValid) return;

    const { currentRange: r, contentHighlighted } = this.state;
    const { articleId, createInlineCommentDispatch } = this.props;

    const currentRange = r.cloneRange();
    const markerNode = document.createElement('section');
    markerNode.appendChild(contentHighlighted);
    markerNode.style.cssText = 'background-color:red;display:inline';

    this.extractedContent = currentRange.extractContents();
    currentRange.insertNode(markerNode);

    this.setState({ currentRange });
    this.currentRange = currentRange;

    const highlightIndex = this.getHighlightTextIndex(markerNode);
    const commentDetails = { articleId, content, ...highlightIndex };

    createInlineCommentDispatch(commentDetails);
  }

  /**
   * Updates the parent dom after a comment action
   *
   * @returns {void}
   */
  updateParentDom = () => {
    const { inlineComment: { error } } = this.props;
    const { currentRange } = this.state;

    if (error) {
      currentRange.deleteContents();
      currentRange.insertNode(this.extractedContent);
    }

    this.clonedElement = this.parentRef.current.innerHTML;
    const { resetCommentState } = this.props;

    this.restoreParentDom();
    resetCommentState();
  }

  getHighlightParentNode = () => {
    
  };

  displayInlineComments = () => {
    try {
      const { inlineComment } = this.props;
      const { comments } = inlineComment;
      console.log(comments);
      const domHtml = this.parentRef.current.innerHTML;

      const [singleComment] = comments;
      const [startIndex, endIndex] = singleComment.highlightIndex.split(':');

      const commentRange = new Range();
      commentRange.setStart(this.parentRef.current, startIndex);
      commentRange.setEnd(this.parentRef.current, endIndex);

      console.log(commentRange);
    // eslint-disable-next-line no-empty
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      createCommentLeft, createCommentTop, showForm, currentRange, ValidationErrors
    } = this.state;
    const { inlineComment } = this.props;
    const {
      isLoading, error, errors, message, commented, comments
    } = inlineComment;
    const style = { position: 'absolute', top: createCommentTop, left: createCommentLeft };

    if ((commented || error) && currentRange) this.updateParentDom();
    if (comments.length) this.displayInlineComments();

    return (
      <>
        <Message active={error} heading={message} messages={Object.values(errors || [])} />
        {!!comments.length && <InlineCommentCard comments={comments} />}
        {showForm
          && (
            <InlineCommentForm
              isLoading={isLoading}
              style={style}
              createComment={this.createComment}
              ValidationErrors={ValidationErrors}
            />
          )}
      </>
    );
  }
}

export default connect({
  createInlineCommentDispatch: createInlineComment,
  resetCommentState: clearInlineCommentState,
  getInlineCommentsDispatch: getInlineComments
})(InlineComment);
