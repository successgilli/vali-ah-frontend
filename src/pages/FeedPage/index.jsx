// react libraries
import React from 'react';

// components
import FeedCards from 'components/FeedCard';
import ShareStory from 'components/ShareStory';
import SubscriptionCard from 'components/SubscriptionCard';

// http
import http from 'utils/http';

// styles
import './FeedPage.scss';

/**
 * Component for user feed page
 * @summary creates the feed page and fetches all user feed and subscriptions
 */
export class FeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      subscriptions: [],
      shareStoryClass: 'feed-page__share-div'
    };
    this.header = React.createRef();
  }

  componentDidMount() {
    this.fetch();
    const { current } = this.header;
    window.addEventListener('scroll', () => this.setHeaderClass(current.offsetTop));
  }

  /**
    * Handles the fecth request for user feed and subscriptions
    * @method
    *
    * @return {void}
    */
  fetch = async () => {
    const response1 = await http.get(`${process.env.API_ROUTE}/articles/feed`);
    const response2 = await http.get(`${process.env.API_ROUTE}/articles?includeSubscriptions=true`);
    this.setState({ articles: response1.data, subscriptions: response2.data });
  }

  /**
    * Controls the classname of the ShareStory component
    * @method
    *
    * @return {void}
    */
  setHeaderClass = (offsetTop) => {
    if (window.pageYOffset > offsetTop) {
      this.setState({ shareStoryClass: 'feed-page__share-div--sticky' });
    } else {
      this.setState({ shareStoryClass: 'feed-page__share-div' });
    }
  }

  /**
    * Renders the subscription cards
    * @method
    *
    * @return {void}
    */
  renderSubscriptionCard = (subscriptions) => subscriptions.map((sub) => (
    <SubscriptionCard
      title={sub.title}
      summary={sub.summary}
      image={sub.author.avatarUrl}
      slug={sub.slug}
    />
  ))

  /**
    * Renders the feed cards
    * @method
    *
    * @return {void}
    */
  renderFeedCards = (articles) => articles.map((article) => {
    const date = article.updatedAt;
    const displayDate = new Date(
      date.slice(0, 4), date.slice(5, 7), date.slice(8, 10)
    ).toDateString();

    return (
      <FeedCards
        title={article.title}
        date={displayDate}
        tag={article.tags[0]}
        slug={article.slug}
        image={article.coverImageUrl}
        profileImage={article.author.avatarUrl}
      />
    );
  })

  render() {
    const { articles, subscriptions, shareStoryClass } = this.state;
    const subscription = this.renderSubscriptionCard(subscriptions);
    const feed = this.renderFeedCards(articles);

    return (
      <div className="feed-page">
        <div ref={this.header} className={shareStoryClass}>
          <div className="feed-page__share-container">
            <ShareStory />
          </div>
          <div className="feed-page__aside-offset" />
        </div>
        <div className="feed-page__content">
          <div className="feed-page__main-content">
            <div className="feed-page__feed">Feed</div>
            {(articles.length === 0) && <p className="feed-page__no-feed">You have no feed because you are currently not following any author</p>}
            {(articles.length !== 0) && feed}
          </div>
          <div className="feed-page__suggested">
            <div className="feed-page__suggested-stories">Suggested Stories</div>
            <div className="feed-page__top-stories">
              {subscription}
              <div className="feed-page__bottom-offset" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FeedPage;
