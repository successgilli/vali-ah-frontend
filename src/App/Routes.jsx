// react libraries
import React from 'react';

// third-party libraries
import { Switch, Route } from 'react-router-dom';

// pages
import PasswordResetPage from 'pages/PasswordResetPage';
import UserFeedPage from 'pages/UserFeedPage';
import NotFoundPage from 'pages/NotFoundPage';
import ProfileView from 'pages/ProfileView';
import ProfileUpdatePage from 'pages/ProfileUpdate';
import HomePage from '../pages/HomePage/index';


const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/login" component={UserFeedPage} />
    <Route exact path="/profile/view" component={ProfileView} />
    <Route exact path="/profile/update" component={ProfileUpdatePage} />
    <Route exact path="/password-reset" component={PasswordResetPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Routes;
