// react libraries
import React from 'react';

/**
 * Base component for all components that fetch articles
 *
 * @summary adds scroll listening event abilities to components that extends it
 */
class ScrollComponent extends React.Component {
  constructor(props) {
    super(props);
    this.page = 1;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.fetch(this.page);
    this.page = this.page + 1;
  }

    /**
    * Handle browser scroll events and calls the fetch method based on scroll level
    * @method
    *
    * @return {void}
    */
    handleScroll = () => {
      if (window.scrollY >= (document.documentElement.scrollHeight - window.innerHeight)) {
        this.fetch(this.page);
        this.page = this.page + 1;
      }
    }
}

export default ScrollComponent;
