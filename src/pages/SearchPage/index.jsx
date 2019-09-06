// third-party libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// scss
import './SearchPage.scss';

// components
import Spinner from 'components/Spinner';
import Card from 'components/Card';
import Search from 'components/Search';

// utils
import connect from 'utils/connect';
import { searchArticlesRequest } from 'modules/search';

/**
 * Component for Search page
 * @summary Handle article search
 */ export class SearchPage extends Component {
  /**
   * @name Vote propTypes
   * @type {propTypes}
   *
   * @param {Object} props - React PropTypes
   *
   * @property {string} term - search query
   * @property {string} query - user input
   * @property {boolean} searched - to if the user is searched
   * @property {Function} formSubmit - handle term
   * @property {Function} handleInputChange - handle input change
   * @property {Function} handleTermChange - handle term
   * @property {Function} handleSearch - process the search
   * @property {Function} handleIncomingSearch - handle the search on the global header
   * @property {Function} renderList - render searched item
   *
   */
  static propTypes = {
    search: PropTypes.instanceOf(Object).isRequired,
    searchArticlesRequest: PropTypes.func.isRequired,
    history: PropTypes.instanceOf(Object).isRequired,
  };

  constructor(props) {
    super(props);
    const {
      history: {
        location: { search },
      },
    } = this.props;
    const query = search.split('=')[1];
    this.state = {
      term: 'tag',
      query,
      searched: false,
    };
  }

  componentDidMount() {
    const { query } = this.state;
    if (query) {
      this.handleIncomingSearch();
    }
  }

  submitForm = (term) => {
    const { query } = this.state;
    const { searchArticlesRequest: searchArticles } = this.props;
    searchArticles({ term, query });
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({ query: value });
  };

  handleTermChange = ({ target: { value } }) => {
    this.setState(() => ({
      term: value,
    }));

    this.submitForm(value);
  };

  handleSearch = ({ keyCode }) => {
    const { term } = this.state;
    if (keyCode === 13) {
      this.setState(() => ({
        searched: true,
      }));

      return this.submitForm(term);
    }
    return null;
  };

  handleIncomingSearch = () => {
    const { term } = this.state;
    this.setState(() => ({
      searched: true,
    }));

    this.submitForm(term);
  };

  renderList = () => {
    const {
      search: { data }
    } = this.props;

    return (data)
      ? data.map((article) => (
        <Link
          to={`/articles/${article.slug}`}
          key={article.title}
          className="card-display"
        >
          <Card
            img={article.coverImageUrl}
            tag={article.category}
            title={article.title}
            summary={article.summary}
            author={article.author.name}
          />
        </Link>
      ))
      : [];
  };

  render() {
    const {
      search: { loading },
    } = this.props;
    const { query, searched } = this.state;

    return (
      <div className="search-container">
        <div>
          <Search
            className="search-container__search"
            type="text"
            placeholder="Search for articles"
            searchkeyUp={this.handleSearch}
            changeValue={this.handleInputChange}
            searchValue={query}
            required
          />
        </div>
        {loading && <Spinner caption="Searching" />}
        {searched && (
          <div className="search-container__query-button">
            <button
              className="query-button__tag"
              type="button"
              onClick={this.handleTermChange}
              value="tag"
            >
              tag
            </button>
            <button
              className="query-button__author"
              type="button"
              onClick={this.handleTermChange}
              value="author"
            >
              author
            </button>
            <button
              className="query-button__title"
              type="button"
              onClick={this.handleTermChange}
              value="title"
            >
              title
            </button>
            <button
              className="query-button__keyword"
              type="button"
              onClick={this.handleTermChange}
              value="keyword"
            >
              keyword
            </button>
          </div>
        )}
        <div className="search-container__card-grid">{this.renderList()}</div>
      </div>
    );
  }
}

export default connect({ searchArticlesRequest })(SearchPage);
