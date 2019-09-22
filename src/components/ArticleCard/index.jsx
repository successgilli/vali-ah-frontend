import React from 'react';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import './ArticleCard.scss';

import profileImage from 'assets/images/profileImage.png';

import viewsIcon from '../../assets/images/views.svg';


const ArticleCard = ({
  title = '',
  summary = '',
  category = '',
  slug = '',
  coverImageUrl = ''
}) => (
  <div className="card-wrapper">
    <div className="card">
      <img src={coverImageUrl || 'https://i.postimg.cc/HnL9DLBq/gymnastics-1284656-1920.jpg'} alt="Article cover" className="card__thumbnail" />
      <div className="card__body">
        <h4 className="card__body__category">{category}</h4>
        <Link to={`/articles/${slug}`}>
          <h2 className="card__body__title">{title}</h2>
          <div className="card__body__summary">
            <p>{summary.slice(0, 100)}</p>
          </div>
        </Link>
      </div>
      <div className="card__footer">
        <img src={profileImage} alt="loading..." className="card__footer__user-avatar" />
        <div className="card__footer__views-holder">
          <img src={viewsIcon} alt="loading..." />
          <span className="card__footer__total-views">50</span>
        </div>
      </div>
    </div>
  </div>
);


ArticleCard.propTypes = {
  summary: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  coverImageUrl: PropTypes.string.isRequired
};

ArticleCard.defaultProp = {
  summary: '',
  title: '',
  category: '',
  coverImageUrl: '',
  slug: ''
};

export default ArticleCard;
