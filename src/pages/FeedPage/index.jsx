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
class FeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      subscriptions: []
    };
  }

  componentDidMount() {
    this.fetch();
  }

  /**
    * Handles the fecth request for user feed and subscriptions
    * @method
    *
    * @return {void}
    */
  fetch = async () => {
    try {
      const response1 = await http.get('/articles/feed');
      const response2 = await http.get('/articles?includeSubscriptions=true');

      this.setState({ articles: response1.data, subscriptions: response2.data });
    } catch (error) {
      console.log(error.response);
    }
  }

  render() {
    const { articles, subscriptions } = this.state;
    const subscription = subscriptions.map((sub) => (
      <SubscriptionCard
        title={sub.title}
        summary={sub.summary}
        image={sub.author.avatarUrl}
        slug={sub.slug}
      />
    ));
    const feed = articles.map((article) => {
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
        />
      );
    });

    return (
      <div className="feed-page">
        <div className="feed-page__share-div">
          <div className="feed-page__share-container">
            <ShareStory />
          </div>
          <div className="feed-page__aside-offset" />
        </div>
        <div className="feed-page__content">
          <div className="feed-page__main-content">
            <div className="feed-page__feed">Feed</div>
            {feed}
          </div>
          <div className="feed-page__suggested">
            <div className="feed-page__suggested-stories">Suggeted Stories</div>
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
