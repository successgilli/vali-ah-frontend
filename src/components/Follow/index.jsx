/* eslint-disable react/prop-types */
// react libraries
import React from 'react';

// third-party libraries
import connect from 'utils/connect';

// components
import Button from 'components/Button';

// utils
import { requestFollowUser } from 'modules/followUser';

// styles
import './Follow.scss';

export class Follow extends React.Component {
  handleFollowClick = () => {
    const { requestFollowUser: followUserRequest } = this.props;
    const userId = 'b113dfcd-da72-4c01-8216-253b1e4bce76';
    followUserRequest(userId);
  }

  render() {
    const { followUser } = this.props;
    const { active } = followUser.payload;
    const label = active ? 'Unfollow' : 'Follow';
    return (
      <Button onClick={this.handleFollowClick}>
        {label}
      </Button>
    );
  }
}

export default connect({ requestFollowUser })(Follow);
