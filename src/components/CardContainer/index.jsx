/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import Proptypes from 'prop-types';

import Masonry from 'components/Masonry';

import './CardContainer.scss';

const CardContainer = (props) => {
  const { CardComponent, cardData } = props;
  return (
    <div className="app-container card-container">
      <div className="card-container card-container__amazing-topics">
        <h1>Explore Amazing Topics</h1>
        <p>Curated stories based on your preference</p>
      </div>
      <Masonry>
        {(cardData || []).map((data) => <CardComponent {...data} />)}
      </Masonry>
    </div>
  );
};

CardContainer.propTypes = {
  cardData: Proptypes.arrayOf().isRequired,
  CardComponent: Proptypes.node.isRequired
};

export default CardContainer;
