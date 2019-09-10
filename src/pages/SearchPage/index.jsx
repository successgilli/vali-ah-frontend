// react library
import React, { Component } from 'react';

// third-party libraries
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// scss
import './SearchPage.scss';

// components
import Spinner from 'components/Spinner';
import Card from 'components/Card';
import LinkButton from 'components/LinkButton';
import Search from 'components/Search';

// utils
import connect from 'utils/connect';

// modules
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
    search: PropTypes.shape({
      loading: PropTypes.bool,
      data: PropTypes.arrayOf(Object)
    }).isRequired,
    searchArticlesRequest: PropTypes.func.isRequired,
    history: PropTypes.shape({
      location: PropTypes.shape({
        search: PropTypes.string
      })
    }).isRequired
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
    this.setState({ term: value }, this.submitForm(value));
  };

  handleSearch = ({ keyCode }) => {
    const { term } = this.state;
    if (keyCode === 13) {
      this.setState({ searched: true }, this.submitForm(term));
    }
  };

  handleIncomingSearch = () => {
    const { term } = this.state;
    this.setState({ searched: true }, this.submitForm(term));
  };

  renderList = () => {
    const {
      search: { data }
    } = this.props;

    return data.map((article) => (
      <Link
        to={`/articles/${article.slug}`}
        key={article.articleId}
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
    ));
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
            searchkeyUp={this.handleSearch}
            changeValue={this.handleInputChange}
            searchValue={query}
            required
          />
        </div>
        {loading && <Spinner caption="Searching" />}
        {searched && (
          <div>
            <LinkButton
              text="tag"
              className="search-container__query-button-tag"
              onClick={this.handleTermChange}
            />
            <LinkButton
              text="author"
              className="search-container__query-button-author"
              onClick={this.handleTermChange}
            />
            <LinkButton
              text="title"
              className="search-container__query-button-title"
              onClick={this.handleTermChange}
            />
            <LinkButton
              text="keyword"
              className="search-container__query-button-keyword"
              onClick={this.handleTermChange}
            />
          </div>
        )}
        <div>{this.renderList()}</div>
      </div>
    );
  }
}

export default connect({ searchArticlesRequest })(SearchPage);
