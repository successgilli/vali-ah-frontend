import React from 'react';

import './DiscoverSection.scss';

import communityImage from '../../assets/images/community-image.png';

const DiscoverSection = () => (
  <section className="discover-section">
    <div className="discover-section__community-content">
      <p className="discover-section__community-content__text">Discover</p>
      <h1 className="discover-section__community-content__title">
        Curated stories based on your selection
      </h1>
      <p className="discover-section__community-content__text">Top stories tailored to meet your need</p>
      <div className="heroSection__heroContent__buttonWrapper">
        <button type="button" className="heroSection__heroContent__buttonWrapper__ctaButton">Join 1kbIdeas</button>
      </div>
    </div>
    <div className="discover-section__community-image">
      <img src={communityImage} alt="1kbIdeas community" />
      <p>This is the best place to live on the internet</p>
      <span>Angelina Jolie</span>
    </div>
  </section>
);

export default DiscoverSection;
