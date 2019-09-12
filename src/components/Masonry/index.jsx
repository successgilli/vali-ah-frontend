import React, { useRef, useState, useEffect } from 'react';
import Proptypes from 'prop-types';

import { MasonryDiv, Col, Margin } from './style';

const Masonry = ({ children, gap, minWidth = 300 }) => {
  const cols = [];
  const ref = useRef();
  const [numCols, setNumCols] = useState(3);

  const calcNumCols = () => setNumCols(Math.floor(ref.current.offsetWidth / minWidth));

  const createCols = () => {
    if (!ref.current) return;
    const randIndex = () => Math.floor(Math.random() * 30);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < numCols; i++) cols[i] = [];
    children
      .forEach((Child, i) => cols[i % numCols].push(
        <Margin margin={randIndex(i)}>{Child}</Margin>
      ));
  };


  useEffect(() => {
    window.addEventListener('resize', calcNumCols);

    return () => window.removeEventListener('resize', calcNumCols);
  });

  createCols();

  return (
    <MasonryDiv ref={ref} gap={gap}>
      {Array(numCols)
        .fill()
        .map((el, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Col key={index} gap={gap}>
            {cols[index]}
          </Col>
        ))}
    </MasonryDiv>
  );
};

Masonry.propTypes = {
  children: Proptypes.node,
  gap: Proptypes.number,
  minWidth: Proptypes.number
};

Masonry.defaultProps = {
  children: '',
  gap: '',
  minWidth: 300
};

export default Masonry;
