// react libraries
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// pages
import HomePage from 'pages/HomePage';
import PasswordResetPage from 'pages/PasswordResetPage';
import UserFeedPage from 'pages/UserFeedPage';
import NotFoundPage from 'pages/NotFoundPage';
import Bookmarks from 'components/Bookmarks';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/login" component={UserFeedPage} />
    <Route exact path="/articles/bookmarks" component={Bookmarks} />
    <Route exact path="/password-reset" component={PasswordResetPage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Routes;
