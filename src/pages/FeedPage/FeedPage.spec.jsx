// react libraries
import React from 'react';

// http
import http from 'utils/http';

// components
import { FeedPage } from './index';

const articles = {
  data: [
    {
      title: 'benny',
      updatedAt: '2019-09-12T08:58:50.855Z',
      tags: ['production'],
      author: {
        avatarUrl: 'string'
      }
    },
    {
      title: 'benny',
      updatedAt: '2019-09-12T08:58:50.855Z',
      tags: ['production'],
      author: {
        avatarUrl: 'string'
      }
    }
  ]
};

describe('FeedPage', () => {
  it('renders properly', () => {
    const wrapper = shallow(<FeedPage />);

    expect(wrapper.find('img')).toHaveLength(0);
    expect(wrapper.state().subscriptions.length).toEqual(0);
    expect(wrapper.state().articles.length).toEqual(0);
    expect(wrapper.state().shareStoryClass).toEqual('feed-page__share-div');
    expect(wrapper.find('div p').text()).toEqual('You have no feed because you are currently not following any author');
  });

  it('should handle scroll event to change class of ShareComponent', () => {
    sinon.stub(http, 'get').callsFake(() => articles);
    const wrapper = shallow(
      <FeedPage />
    );
    const component = wrapper.instance();
    window.pageYOffset = 200;
    component.setHeaderClass(100);

    expect(component.state.shareStoryClass).toEqual('feed-page__share-div--sticky');

    component.setHeaderClass(300);

    expect(component.state.shareStoryClass).toEqual('feed-page__share-div');
  });
});
