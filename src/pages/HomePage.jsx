// react libraries
import React, {
  Component, useRef, useEffect, useState
} from 'react';

// utils
import connect from 'utils/connect';


import ParentComponent from 'fixtures/inlineCommentParent';
// component
import InlineCommentConnected from 'components/InlineComment';

const BaseComponent = () => {
  const parentRef = useRef();
  const [isMounted, setIsMounted] = useState(false);
  const [ArticleComponent, setArticleContent] = useState(<ParentComponent />);

  const updateArticleContent = (Article) => setArticleContent(Article);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <h4>Hi</h4>
      <div ref={parentRef}>
        {ArticleComponent}
      </div>
      {isMounted && (
        <InlineCommentConnected parentRef={parentRef} updateArticle={updateArticleContent} />)}
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
