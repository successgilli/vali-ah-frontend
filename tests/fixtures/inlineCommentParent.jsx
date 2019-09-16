/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import React, { useRef, useEffect, useState } from 'react';

// utils
// component
import { InlineComment } from 'components/InlineComment';

const ParentComponent = () => (
  <div id="article-content">
    <h1>A Guide to Solving Web Development Problems</h1>

    <p>If not then you'll need to verify it on another computer. If it proves impossible to replicate then you often don't have a real error and the problem will take care of itself.</p>


  </div>
);

export const BaseComponent = () => {
  const parentRef = useRef();
  const [isMounted, setIsMounted] = useState(false);
  const [ArticleComponent, setArticleContent] = useState(<ParentComponent />);
  const updateArticleContent = (Article) => {
    setArticleContent(Article);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <h4>Hi</h4>
      <div ref={parentRef}>
        {ArticleComponent}
      </div>
      {isMounted && <InlineComment parentRef={parentRef} updateArticle={updateArticleContent} />}
    </>
  );
};

export default ParentComponent;
