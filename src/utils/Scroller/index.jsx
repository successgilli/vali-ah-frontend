// react libraries
import React from 'react';

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

    handleScroll = () => {
      if (window.scrollY >= (document.documentElement.scrollHeight - window.innerHeight)) {
        this.fetch(this.page);
        this.page = this.page + 1;
      }
    }
}

export default ScrollComponent;
