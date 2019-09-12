// react libraries
import React from 'react';
import PropTypes from 'prop-types';

// third-party libraries
import { Link } from 'react-router-dom';

// styles
import './BookmarkCard.scss';

// utils
import formatDate from 'utils/formatDate';
import userAvatar from 'assets/images/userAvatar.png';
import bookmarkIcon from 'assets/images/bookmarkIcon.png';
import iconEye from 'assets/images/iconEye.png';

const BookmarkCard = ({ article }) => {
  const {
    title, slug, createdAt, coverImageUrl, avatarUrl, category
  } = article;
  const formattedDate = formatDate(createdAt);
  const avatar = avatarUrl || userAvatar;
  const image = coverImageUrl || 'https://picsum.photos/300';
  const tag = category[0];

  return (
    <div className="bookmark-card">
      <div className="bookmark-card__image-div">
        <img className="bookmark-card__image" src={image} alt="card" />
      </div>
      <div className="bookmark-card__details">
        <div className="bookmark-card__info">
          <p className="bookmark-card__tag">{tag}</p>
          <Link to={`/articles/${slug}`}><h3 className="bookmark-card__title">{title}</h3></Link>
          <p className="bookmark-card__date">{formattedDate}</p>
          <img className="bookmark-card__profile-image" src={avatar} alt="user avatar" />
        </div>
        <div className="bookmark-card__icons">
          <img className="bookmark-card__component" src={bookmarkIcon} alt="BI" />
          <img className="bookmark-card__component" src={iconEye} alt="VW" />
        </div>
      </div>
    </div>
  );
};

BookmarkCard.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
    createdAt: PropTypes.string,
    coverImageUrl: PropTypes.string,
    avatarUrl: PropTypes.string,
    category: PropTypes.arrayOf(String)
  }).isRequired
};

export default BookmarkCard;
