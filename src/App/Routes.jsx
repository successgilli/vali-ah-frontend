// react libraries
import React from 'react';

// third-party libraries
import { Switch, Route } from 'react-router-dom';

// pages
import HomePage from 'pages/HomePage';
import PasswordResetPage from 'pages/PasswordResetPage';
import UserFeedPage from 'pages/UserFeedPage';
import NotFoundPage from 'pages/NotFoundPage';
import CreateArticlePage from 'pages/Articles/CreateArticlePage';
import FeedPage from 'pages/FeedPage';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/login" component={UserFeedPage} />
    <Route exact path="/password-reset" component={PasswordResetPage} />
    <Route exact path="/article" component={CreateArticlePage} />
    <Route exact path="/feed" component={FeedPage} />
    <Route exact path="/createArticles" component={() => <div>Create articles</div>} />
    <Route exact path="/articles/:id" component={() => <div>Article page</div>} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Routes;
