import React, { Component } from 'react';
import IdleTimer from 'react-idle-timer';
import PropTypes from 'prop-types';

import renderEditor, { editor } from 'utils/articles/editorConfig';
import { createArticleRequest } from 'modules/articles';

import './CreateArticlePage.scss';
import blockToHtmlConverter from 'utils/articles/blockToHtmlConverter';
import characterCounter from 'utils/articles/characterCounter';
import connect from 'utils/connect';

class CreateArticlePage extends Component {
  static propTypes = {
    createArticleRequest: PropTypes.func.isRequired,
    articles: PropTypes.shape({
      createdArticle: PropTypes.shape({
        createdAt: PropTypes.string
      })
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      blocks: [],
      count: 1024
    };
    this.idleTimer = null;
  }

  componentDidMount() {
    renderEditor();
  }

  async componentWillUnmount() {
    await this.saveArticle('draft');
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  saveArticle = async (status) => {
    const { body, title } = JSON.parse(sessionStorage.getItem('articleDraft'));
    const htmlBody = blockToHtmlConverter(body);
    const content = { title, body: htmlBody, status };
    const { count } = this.state;
    const { createArticleRequest: createArticle } = this.props;
    if (count >= 0) {
      await createArticle(content);
    }
  }

  publishArticle = async () => {
    const { history } = this.props;
    await this.saveArticle('published');
    history.push('/');
  }

  onIdle = async () => {
    const { blocks } = await editor.save();
    console.log('blocks :', blocks);
    const count = characterCounter(blocks);
    const charsLeft = 1024 - count;
    await this.setState({ count: charsLeft, blocks });
    const { title, blocks: body } = this.state;
    if (charsLeft > 0) {
      sessionStorage.setItem('articleDraft', JSON.stringify({ title, body }));
    }
  }

  render() {
    const { title, count } = this.state;
    return (
      <div className="article">
        <IdleTimer
          ref={(ref) => { this.idleTimer = ref; }}
          element={document}
          onIdle={this.onIdle}
          timeout={1000}
        />
        <div className="article-publish">
          <div className="article-publish__count">Auto Save is On</div>
          <div className="article-publish__count">{`${count} characters`}</div>
          <button type="button" onClick={this.publishArticle} disabled={count < 0}>Publish</button>
        </div>
        <div className="article-editor">
          <input type="text" name="title" className="article-title" placeholder="Type your title" value={title} onChange={this.handleChange} />
          <div id="1kbideas-editor" />
        </div>
      </div>
    );
  }
}

export default connect({ createArticleRequest })(CreateArticlePage);
