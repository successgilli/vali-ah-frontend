// react libraries
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// styles
import './Header.scss';

// asset
import logo from 'images/1KbIdeas.svg';


/**
 * @exports
 * @class Header
 * @extends Component
 * @classdesc Creates Header Component
 *
 * @returns {JSX} Header Component
 */
export class Header extends Component {
    static propTypes = {
      history: PropTypes.instanceOf(Object).isRequired,
    };

    constructor(props) {
      super(props);
      this.state = {
        searchValue: '',
      };
    }

  handleInputChange = ({ target: { value } }) => {
    this.setState({ searchValue: value });
  };

  handleSearch = ({ keyCode }) => {
    const { searchValue } = this.state;
    const { history } = this.props;

    if (keyCode === 13) {
      history.push(`/search?query=${searchValue}`);
    }
  };

  render() {
    const { searchValue } = this.state;
    return (
      <header className="header">
        <a href="/#">
          <img src={logo} className="header_logo" alt="1kbIdeas logo" />
        </a>
        <div>
          <input
            type="text"
            className="header_search"
            placeholder="Search for articles"
            onKeyUp={this.handleSearch}
            onChange={this.handleInputChange}
            value={searchValue}
          />
        </div>
        <nav>
          <a
            href="/#"
            className="header__navlink header__navlink--right"
          >
            Sign in
          </a>
          <a href="/#" className="header__navlink">
            Sign up
          </a>
        </nav>
      </header>
    );
  }
}

export default withRouter(Header);
