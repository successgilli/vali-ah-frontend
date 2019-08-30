import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import API from 'modules/search/requests';
import ArticleSearchCard from 'components/ArticleSearchCard';
import './SearchResult.scss';

/**
 * const search = {
  data: [],
  failed: false,
  isLoading: false,
  cleared: true,
  message: '',
  done: false,
};
 */


class SearchPage extends Component {
  static propTypes = {
    search: PropTypes.instanceOf(Object).isRequired,
    searchArticles: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    };
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    const { searchValue } = this.state;
    const { searchArticles } = this.props;
    searchArticles(searchValue);
    this.setState({ searchValue: '' });
  }

  onSearchValueChange = ({ target }) => {
    this.setState({ searchValue: target.value });
    const { searchValue } = this.state;
    const { searchArticles } = this.props;

    if (searchValue.length >= 3) searchArticles(searchValue);
  }

  renderList() {
    // eslint-disable-next-line react/destructuring-assignment
    const { results } = this.props.search;
    return results.map(({ article }) => {
      const { suspended, status } = article;
      if (!suspended && status === 'published') {
        return (
          <ArticleSearchCard
            authorName={article.author.name}
            title={article.title}
            summary={article.summary}
            id={article.ArticleId}
            createdAt={article.createAt}
            imageLink={article.coverImageUrl}
            category={article.category}
          />
        );
      }
      return null;
    });
  }

  render() {
    const { searchValue } = this.state;
    return (
      <form onSubmit={this.onFormSubmit} className="">
        <input
          className="search"
          type="text"
          placeholder="Search for articles"
          onChange={this.onSearchValueChange}
          value={searchValue}
        />
      </form>
    );
  }
}

const mapStateToProps = ({ search }) => ({ search });

const mapDispatchToProps = (dispatch) => ({
  searchArticles: () => dispatch(API.searchArticles())
});


export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
