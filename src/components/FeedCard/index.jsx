// react libraries
import React from 'react';
import propTypes from 'prop-types';

// third-party libraries
import { Link } from 'react-router-dom';

// styles
import './FeedCard.scss';

/**
 * Component for feedcard structure
 * @summary designs the feed cards on the user feed page
 */
export class FeedCard extends React.Component {
  /**
    * @name FeedCard propTypes
    * @type {propTypes}
    *
    * @param {Object} props - React PropTypes
    *
    * @property {string} image - image of the article
    * @property {string} profileImage - image of the article's author
    * @property {Function} tag - the category of the  article
    * @property {Function} title - ititle of the article
    * @property {Function} slug - the unique article's slug
    * @property {Function} date - the stringified date of article's creation
    *
    */
    static propTypes = {
      image: propTypes.string.isRequired,
      profileImage: propTypes.string.isRequired,
      tag: propTypes.string.isRequired,
      title: propTypes.string.isRequired,
      slug: propTypes.string.isRequired,
      date: propTypes.string.isRequired
    }

    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const {
        image, profileImage, tag, title, slug, date
      } = this.props;
      return (
        <div className="feed-card">
          <div className="feed-card__image-div">
            <img className="feed-card__image" src={image || 'https://i.pinimg.com/originals/cf/eb/30/cfeb3055f02670a1a19edf52b02f5b7a.jpg'} alt="card" />
          </div>
          <div className="feed-card__details">
            <div className="feed-card__info">
              <p className="feed-card__tag">{tag}</p>
              <Link to={`/articles/${slug}`}><h3 className="feed-card__title">{title}</h3></Link>
              <p className="feed-card__date">{date}</p>
              <img className="feed-card__profile-image" src={profileImage || 'https://militaryfamilies.psu.edu/wp-content/uploads/2019/04/placeholder_profile_photo.png'} alt="card" />
            </div>
            <div className="feed-card__icons">
              <div className="feed-card__component">BM</div>
              <div className="feed-card__component">VW</div>
            </div>
          </div>
        </div>
      );
    }
}

export default FeedCard;
