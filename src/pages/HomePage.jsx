// react libraries
import React, { Component, createRef, useRef, useEffect, useState } from 'react';

// utils
import connect from 'utils/connect';


import ParentComponent from 'fixtures/inlineCommentParent';
// component
import { InlineComment } from 'components/InlineComment';

const BaseComponent = () => {
  const parentRef = useRef();
  const [isMounted, setIsMounted] = useState(false);
  const getParentRef = () => parentRef;
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <h4>Hi</h4>
      <div ref={parentRef}>
        <ParentComponent />
      </div>
      {isMounted && <InlineComment parentRef={parentRef} />}
    </>
  );
};


/**
 * @exports
 * @class HomePage
 * @extends Component
 * @classdesc Creates HomePage Component
 *
 * @returns {JSX} HomePage Component
 */
class HomePage extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <BaseComponent />
    );
  }
}

export default connect({ })(HomePage);
