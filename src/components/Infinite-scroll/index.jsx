/* eslint-disable no-plusplus */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
import http from 'utils/http';
import React from 'react';
import { connect } from 'react-redux';

import './index.scss';

class ScrollComponent extends React.Component {
  constructor(props) {
    super(props);
    this.page = 1;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    // eslint-disable-next-line no-plusplus
    this.fetch(this.page++);
  }

    handleScroll = () => {
      console.log(window.innerHeight, 'scree');
      // eslint-disable-next-line no-cond-assign
      console.log(document.body.scrollHeight, ' sceoll');
      console.log(document.documentElement.scrollHeight, ' inner');
      if (window.scrollY >= (document.documentElement.scrollHeight - window.innerHeight)) {
        console.log(window.innerHeight, ' inner');
        console.log(document.body.scrollHeight, ' sceoll');
        console.log(this.page);
        console.log('enterd');
        console.log(window.scrollY);
        this.fetch(this.page++);
      }
    }
}

class Scroll extends ScrollComponent {
  constructor(props) {
    super(props);
    this.state = {
      term: 'keyword',
      query: 'a',
      limit: 10,
      page: 1,
      articles: [{ name: 'gilli' }, { name: 'success' }]
    };
  }

  async fetch(page) {
    const {
      term, query, limit, articles
    } = this.state;
    const articleUrl = 'articles';
    const response = await http.get(`${process.env.API_ROUTE}/${articleUrl}?${term}=${query}&page=${page}&limit=${limit}`);
    this.setState({
      articles: [...articles, ...response.data],
    });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;
    console.log(children);
    const { articles } = this.state;
    const article = articles.map((eachArt) => (
      <div>
        <div className="cont">
          <div>
            <span>body: </span>
            {eachArt.body}
          </div>
          <div>
            <span>title: </span>
            {eachArt.title}
          </div>
          <div>
            <span>summary</span>
            {eachArt.summary}
          </div>
          <div>
            <span>status</span>
            {eachArt.status}
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        {article}
        <button type="button" onClick={this.handleClick}>Load more</button>
      </div>
    );
  }
}

export default connect()(Scroll);
