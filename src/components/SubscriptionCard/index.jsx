// react libraries
import React from 'react';
import PropTypes from 'prop-types';

// third-party libraries
import { Link } from 'react-router-dom';

// styles
import './SubscriptionCard.scss';

/**
 * Component for category subscription card idsplay
 * @summary it creates the card structure for all articles subscribed
 */
const SubscriptionCard = ({
  title, summary, image, slug
}) => (
  <div className="subscription-card">
    <div className="subscription-card__image-div">
      <img className="subscription-card__image" src={image || 'https://militaryfamilies.psu.edu/wp-content/uploads/2019/04/placeholder_profile_photo.png'} alt="" />
    </div>
    <div className="subscription-card__details">
      <Link to={`/articles/${slug}`}><div className="subscription-card__title">{title}</div></Link>
      <div className="subscription-card__summary">{summary}</div>
    </div>
  </div>
);

/**
  * @name SubscriptionCard propTypes
  * @type {propTypes}
  *
  * @param {Object} props - React PropTypes
  *
  * @property {string} title - title of article
  * @property {string} summary - summary of article
  * @property {string} image - author's image url
  * @property {string} slug - the unique string identifier of the article
  *
  */
SubscriptionCard.propTypes = {
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired
};

export default SubscriptionCard;
