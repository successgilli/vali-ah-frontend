// react libraries
import React from 'react';

import { Provider } from 'react-redux';
import axios from 'axios';

// pages
import mockStore from 'fixtures/store';
import { ViewProfile } from './index';

const store = mockStore({
  profile: {
    loading: false,
    data: {
      bio: 'Thats great',
      firstName: 'James',
      lastName: 'James',
      avatarUrl: 'MyImage',
    },
    errors: null,
  },
});

describe('Profile View', () => {
  let props;
  let wrapper;

  beforeAll(async () => {
    props = {
      profile: {
        loading: false,
        data: {
          bio: 'Thats great',
          firstName: 'James',
          lastName: 'James',
          avatarUrl: 'MyImage',
        },
        errors: null,
      },
      history: { push: jest.fn() },
      getProfileRequest: jest.fn(),
    };
    const { data } = await axios.post(
      'https://vali-1kbideas-staging.herokuapp.com/api/v1/auth/signin',
      {
        password: 'lovem!588',
        email: 'myjoy@gmail.com',
      },
    );

    const { token } = data.data;

    localStorage.setItem('token', token);
    wrapper = mount(
      <Provider store={store}>
        <ViewProfile {...props}>
          <div className="profile-container" />
        </ViewProfile>
      </Provider>,
    );
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should ascertain that all the divs are existing', () => {
    expect(wrapper.find('.profile-container__header')).toHaveLength(1);
    expect(wrapper.find('.profile-container__mini-header')).toHaveLength(1);
    expect(wrapper.find('.profile-container__image-update')).toHaveLength(0);
    expect(wrapper.find('.container__image-cover')).toHaveLength(0);
    expect(wrapper.find('.profile-container__image-preview-view')).toHaveLength(
      1,
    );
    expect(wrapper.find('.profile-container__name')).toHaveLength(1);
    expect(wrapper.find('.profile-container__bio')).toHaveLength(1);
    expect(wrapper.find('.profile-container__social-detail')).toHaveLength(1);
    expect(wrapper.find('.profile-container__edit')).toHaveLength(1);
    expect(wrapper.find('.inverted orange button')).toHaveLength(0);
    expect(wrapper.find('.profile-container-link')).toHaveLength(1);
    expect(wrapper.find('.profile-container-link__published')).toHaveLength(1);
    expect(wrapper.find('.profile-container-link__bookmark')).toHaveLength(1);
    expect(wrapper.find('.profile-container-link__drafts')).toHaveLength(1);
    expect(wrapper.find('.profile-container__response')).toHaveLength(1);
  });

  it('should check if the user details are showing', () => {
    const userName = wrapper.find('#userName');
    const bio = wrapper.find('#bio');
    const profileImage = wrapper.find('#profileImg').at(0);

    expect(userName.text()).toBe(' James James');
    expect(bio.text()).toBe('Thats great');
    expect(profileImage.text()).toBe('');
  });

  it('should check if the edit is clicked', () => {
    const button = wrapper.find('.inverted');
    button.simulate('click');
  });

  it('should check if the published is clicked', () => {
    const button = wrapper.find('.profile-container-link__published');
    button.simulate('click');
  });

  it('should check if the bookmark is clicked', () => {
    const button = wrapper.find('.profile-container-link__bookmark');
    button.simulate('click');
  });

  it('should check if the drafts is clicked', () => {
    const button = wrapper.find('.profile-container-link__drafts');
    button.simulate('click');
  });
});
