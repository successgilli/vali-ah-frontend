// third-party libraries
import React from 'react';
import PropTypes from 'prop-types';

// card scss
import './Card.scss';

const Card = ({
  img, tag, title, summary, author
}) => (
  <div className="ui card ">
    <div className="image card-thumbnail ">
      <img src={img} alt="loading" />
    </div>
    <div className="content">
      <p className="header card-category">{tag}</p>
      <p className="header">{title}</p>
      <div className="description">
        <p>{summary}</p>
      </div>
      <div className="meta card-author">{author}</div>
    </div>
  </div>
);

Card.propTypes = {
  img: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default Card;
