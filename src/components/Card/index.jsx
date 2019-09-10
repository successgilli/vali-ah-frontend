/* eslint-disable react/jsx-curly-brace-presence */
// third-party libraries
// react libraries
import React from 'react';
import PropTypes from 'prop-types';

// styles
import './Card.scss';

const Card = ({
  image, tag, title, summary, author
}) => (
  <div className="ui card ">
    <div className="image">
      <img className="card__card-image" src={image} alt="loading" />
    </div>
    <div className="content">
      <p className="header card__card-category">{tag}</p>
      <p className="header">{title}</p>
      <div className="description">
        <p>{summary}</p>
      </div>
      <div className="meta card__card-author">{author}</div>
    </div>
  </div>
);

Card.propTypes = {
  image: PropTypes.string,
  tag: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

Card.defaultProps = {
  image: 'https://picsum.photos/300/200'
};

export default Card;
