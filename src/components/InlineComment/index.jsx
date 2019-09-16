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
      currentRange: null, showForm: false, showComment: false
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

    const htmlToReactParser = new Parser();
    const reactElement = htmlToReactParser.parse(this.clonedElement);

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
    const commentFormPosition = { top: `${positionTop}px`, left: `${x * 5}px` };

    this.setState({ commentFormPosition });
  }

  /**
   * Event handler to listen for mouse event for highlight
   *
   * @returns {void}
   */
  handleTextHightlight = () => {
    this.setState({ showForm: false, showComment: false });

    if (!window.getSelection) return;

    const selection = window.getSelection();

    if (Math.abs(selection.focusOffset - selection.anchorOffset) < 20) return;

    const cloneRange = selection.getRangeAt(0).cloneRange();

    this.setState({ currentRange: cloneRange, showForm: true });
    this.positionCommentComponent(cloneRange);
  }

  showCommentDetails = (event, comment) => {
    const { pageY } = event;

    const style = { top: pageY };

    this.setState({ showComment: true, commentDetailsStyle: style, commentDetails: [comment] });
  }

  getMarkerNode = (comment) => {
    const markerNode = document.createElement('section');
    markerNode.setAttribute('class', 'inline-comment__marker-node');
    markerNode.onclick = (event) => this.showCommentDetails(event, comment);

    return markerNode;
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
    this.setState({ ValidationErrors: newErrors });

    if (!isValid) return;

    const { currentRange } = this.state;
    const { articleId, createInlineCommentDispatch } = this.props;

    this.extractedContent = currentRange.cloneContents();

    currentRange.surroundContents(this.getMarkerNode());

    this.setState({ currentRange });
    this.currentRange = currentRange;

    const highlightIndex = this.getHighlightTextIndex(currentRange.cloneContents());
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

  getHighlightParentNode = (startIndex) => {
    const containerHtml = this.parentRef.current.innerHTML;
    const regExSearch = new RegExp(/<.([^\s|>]+)/, 'g');

    const precedingText = containerHtml.substring(0, startIndex);

    const tagsInDom = precedingText.match(regExSearch);

    const tag = tagsInDom[tagsInDom.length - 1].substr(1);
    const numberOfTagOccurence = tagsInDom
      .filter((singleTag) => singleTag.substr(1) === tag).length;

    return this.parentRef.current.getElementsByTagName(tag)
      .item(numberOfTagOccurence - 1).firstChild;
  };

  getCommentRange = (comment) => {
    try {
      const [startIndex, endIndex] = comment.highlightIndex.split(':');

      const rangeNode = this.getHighlightParentNode(startIndex, endIndex);

      const range = new Range();
      range.setStart(rangeNode, 0);
      range.setEnd(rangeNode, endIndex - startIndex);

      return range.surroundContents(this.getMarkerNode(comment));
    } catch (error) {
      return error;
    }
  }

  displayInlineComments = () => {
    const { inlineComment } = this.props;
    const { comments } = inlineComment;

    comments.forEach(this.getCommentRange);
  };

  shouldUpdateDom = () => {
    const { currentRange } = this.state;
    const { inlineComment } = this.props;
    const { error, commented } = inlineComment;

    return (commented || error) && currentRange;
  }

  render() {
    const {
      commentFormPosition, showForm, ValidationErrors,
      showComment, commentDetails, commentDetailsStyle
    } = this.state;
    const { inlineComment } = this.props;
    const {
      isLoading, error, errors, message, comments
    } = inlineComment;

    if (this.shouldUpdateDom()) this.updateParentDom();
    if (comments.length) this.displayInlineComments();

    return (
      <>
        <Message active={error} heading={message} messages={Object.values(errors || [])} />
        {showComment && <InlineCommentCard style={commentDetailsStyle} comments={commentDetails} />}
        {showForm
          && (
            <InlineCommentForm
              isLoading={isLoading}
              position={commentFormPosition}
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
