export const commentData = [{
  highlightedText: 'Top noch',
  content: 'Check the spelling',
  valid: true,
  highlightIndex: '31:50',
  user: {
    userName: 'JohnDoe'
  }
}, {
  highlightedText: 'Top noch',
  content: 'Check the spelling',
  valid: false,
  highlightIndex: '31:50',
  user: {
    userName: 'JohnDoe'
  }
}];

export default () => {
  const parentRef = { current: { innerHTML: '' } };
  const props = {
    inlineComment: { comments: commentData },
    parentRef,
    resetCommentState: jest.fn(),
    updateArticle: jest.fn(),
    createInlineCommentDispatch: jest.fn(),
    getInlineCommentsDispatch: jest.fn()
  };

  const documentMock = {
    createElement: jest.fn(() => document),
    setAttribute: jest.fn(),
    appendChild: jest.fn(() => document),
    cloneNode: jest.fn(() => documentMock),
    innerHTML: '',
    style: { },
  };

  const currentRange = {
    deleteContents: jest.fn(),
    insertNode: jest.fn(),
    cloneRange: jest.fn(() => currentRange),
    extractContents: jest.fn(),
    cloneContents: jest.fn(() => documentMock),
    surroundContents: jest.fn()
  };

  const RangeRect = {
    getClientRects: () => [Range],
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
    width: 20,
    height: 20,
    x: 20,
    y: 20
  };

  const windowMock = {
    getSelection: jest.fn(() => windowMock),
    focusOffset: 50,
    anchorOffset: 20,
    getRangeAt: jest.fn(() => windowMock),
    cloneContents: jest.fn(() => windowMock),
    cloneRange: jest.fn(() => RangeRect),
  };

  return {
    props, currentRange, parentRef, documentMock, windowMock
  };
};

export const rangeObject = {
  surroundContents: jest.fn(),
  setStart: jest.fn(),
  setEnd: jest.fn(),
};

global.Range = function Range() {
  this.setStart = rangeObject.setStart;
  this.setEnd = rangeObject.setEnd;
  this.surroundContents = rangeObject.surroundContents;
};
