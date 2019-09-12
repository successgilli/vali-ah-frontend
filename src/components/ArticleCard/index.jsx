import React from 'react';

import PropTypes from 'prop-types';

import './ArticleCard.scss';

import viewsIcon from '../../assets/images/views.svg';

const ArticleCard = ({
  title = '',
  summary = '',
  category = ''
}) => (
  <div className="card-wrapper">
    <div className="card">
      <img src="https://i.postimg.cc/HnL9DLBq/gymnastics-1284656-1920.jpg" alt="Article cover" className="card__thumbnail" />
      <div className="card__body">
        <h4 className="card__body__category">{category}</h4>
        <h2 className="card__body__title">{title}</h2>
        <div className="card__body__summary">
          <p>{summary.slice(0, 100)}</p>
        </div>
      </div>
      <div className="card__footer">
        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="loading..." className="card__footer__user-avatar" />
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
};

ArticleCard.defaultProp = {
  summary: '',
  title: '',
  category: '',
};

export default ArticleCard;
