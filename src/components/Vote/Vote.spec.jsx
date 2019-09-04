import React from 'react';

import { Provider } from 'react-redux';

import mockStore from 'fixtures/store';
import ConnectedVote from './index';


const store = mockStore({
  articleVote: { votes: { upVoteCount: 0, downVoteCount: 0 } },
  error: null
});

describe('Vote Component', () => {
  it('should renders properly', () => {
    const vote = mount(<Provider store={store}><ConnectedVote articleId="900" activeVoteType="upVote" /></Provider>);

    expect(vote.find('.vote')).toBeDefined();
    expect(vote.find('.vote').find('Icon')).toHaveLength(2);
    expect(vote.find('.vote').find('span')).toHaveLength(2);
  });

  it('should check validity of props', () => {
    const vote = shallow(<Provider store={store}><ConnectedVote articleId="900" activeVoteType="upVote" /></Provider>);
    const { props } = vote.props().children;

    expect(props.articleId).toBe('900');
    expect(props.activeVoteType).toBe('upVote');
  });

  it('should use upVoteCount and downVoteCount props', () => {
    const vote = shallow(<Provider store={store}><ConnectedVote articleId="900" upVoteCount={40} downVoteCount={40} activeVoteType="upVote" /></Provider>);
    const { props } = vote.props().children;

    expect(props.upVoteCount).toEqual(40);
    expect(props.downVoteCount).toEqual(40);
  });

  it('should check validity of state', () => {
    const vote = mount(<Provider store={store}><ConnectedVote articleId="900" activeVoteType="upVote" /></Provider>);
    const { activeVoteType } = vote.find('Vote').instance().state;

    expect(activeVoteType).toBe('upVote');
  });

  it('should change active votetype', () => {
    const vote = mount(<Provider store={store}><ConnectedVote articleId="900" /></Provider>);
    vote.find('.icon--upvote').simulate('click');

    const { activeVoteType } = vote.find('Vote').instance().state;

    expect(activeVoteType).toBe('upVote');
  });

  it('should reverse votetype', () => {
    const vote = mount(<Provider store={store}><ConnectedVote articleId="900" activeVoteType="upVote" /></Provider>);
    vote.find('.icon--upvote').simulate('click');

    const { activeVoteType } = vote.find('Vote').instance().state;

    expect(activeVoteType).toBe('nullVote');
  });
});
