// react libraries
import React from 'react';
import axios from 'axios';

// pages
import { ProfileUpdate } from './index';

describe('Profile update', () => {
  const props = {
    profile: {
      loading: false,
      data: [],
      errors: null,
    },
    history: { push: jest.fn() },
    getProfileRequestUpdateSuccess: jest.fn(),
  };

  let wrapper;
  let label;

  beforeEach(async () => {
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
      <ProfileUpdate {...props}>
        <div className="profile-container" />
      </ProfileUpdate>,
    );
    label = wrapper.find('label');
  });

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should ascertain that all the divs are existing', () => {
    expect(wrapper.find('profile-container_header')).toHaveLength(0);
    expect(wrapper.find('profile-container_header')).toHaveLength(0);
    expect(wrapper.find('profile-container_mini_header')).toHaveLength(0);
    expect(wrapper.find('profile-container_image-update')).toHaveLength(0);
    expect(wrapper.find('container_image_cover')).toHaveLength(0);
  });

  it('should submit a form with correct input', () => {
    window.URL.createObjectURL = jest.fn();
    const inputFirstName = wrapper.find('input').at(1);
    const inputLastname = wrapper.find('#lastname');
    const inputUsername = wrapper.find('input').at(3);
    const inputBio = wrapper.find('.update-bio');
    const form = wrapper.find('#updateform');
    const file = new File(['(⌐□_□)'], 'peter.png', { type: 'image/png' });
    const selectImage = wrapper.find('input').at(0);

    selectImage.simulate('change', {
      target: { files: [file], name: 'image' },
    });

    inputFirstName.simulate('change', {
      target: { value: 'Welliams', name: 'firstName' },
    });
    inputLastname.simulate('change', {
      target: { value: 'Lotsfor', name: 'lastName' },
    });
    inputUsername.simulate('change', {
      target: { value: 'Billillsz', name: 'userName' },
    });
    inputBio.simulate('change', {
      target: { value: 'in this life just think', name: 'bio' },
    });
    form.simulate('submit');
    const newState = wrapper.state();

    expect(label).toHaveLength(5);
    expect(newState.data.firstName).toEqual('Welliams');
    expect(newState.data.lastName).toEqual('Lotsfor');
    expect(newState.data.userName).toEqual('Billillsz');
    expect(newState.data.bio).toEqual('in this life just think');
    expect(newState.data.image).toBeInstanceOf(File);
  });
});
