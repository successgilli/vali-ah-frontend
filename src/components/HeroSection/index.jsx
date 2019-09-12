import React from 'react';

import './HeroSection.scss';

import heroImage from '../../assets/images/HeroImage.jpg';
import downArrowIcon from '../../assets/images/arrow-down.svg';

const HeroSection = () => (
  <section className="app-container hero-section">
    <div className="hero-section__hero-content">
      <h1 className="hero-section__hero-content__text"> The one-stop shop for all the self-help ideas you need </h1>
      <p className="hero-section__herocontent__subtext"> Write and share your stories </p>
      <div className="hero-section__hero-content__button-wrapper">
        <button type="button" className="hero-section__hero-content__button-wrapper__cta-button">Join 1kbIdeas</button>
        <button type="button" className="hero-section__hero-content__button-wrapper__cta-button hero-section__hero-content__button-wrapper--signin-button">Sign in</button>
      </div>
      <div className="hero-section__kicker-wrapper">
        <p className="hero-section__kicker-wrapper__kicker-text">Explore amazing topics</p>
        <img src={downArrowIcon} className="hero-section__kicker-wrapper__scrolldown" alt="Scrolldown Icon" />
      </div>
    </div>
    <div className="hero-section__hero-image">
      <img src={heroImage} alt="1kbIdeas community" className="hero-section__hero-image__image-width" />
    </div>
  </section>
);

export default HeroSection;
