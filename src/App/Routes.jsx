// react libraries
import React from 'react';

// third-party libraries
import { Switch, Route, Redirect } from 'react-router-dom';

import connect from 'utils/connect';

// pages
import HomePage from 'pages/HomePage';
import PasswordResetPage from 'pages/PasswordResetPage';
import UserFeedPage from 'pages/UserFeedPage';
import NotFoundPage from 'pages/NotFoundPage';
import CreateArticlePage from 'pages/Articles/CreateArticlePage';
import FeedPage from 'pages/FeedPage';
import ArticlePage from 'pages/ArticlePage';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { auth } = rest;
  return (
   <Route {...rest} render={(props) => (
      auth.token
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  );
};

const ConnectedPrivateRoute = connect({})(PrivateRoute);

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/login" component={UserFeedPage} />
    <Route exact path="/article/:articleSlug" component={ArticlePage} />
    <Route exact path="/password-reset" component={PasswordResetPage} />
    <ConnectedPrivateRoute exact path="/article" component={CreateArticlePage} />
    <ConnectedPrivateRoute exact path="/feed" component={FeedPage} />
    <Route exact path="/createArticles" component={() => <div>Create articles</div>} />
    <Route exact path="/articles/:id" component={() => <div>Article page</div>} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Routes;
