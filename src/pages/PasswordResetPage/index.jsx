// react libraries
import React from 'react';

// third-party libraries
import { Switch, Route } from 'react-router-dom';

// components
import PasswordReset from 'components/PasswordReset';
import PasswordUpdate from 'components/PasswordUpdate';

const PasswordResetPage = () => (
  <>
    <Switch>
      <Route exact path="/password-reset" component={PasswordReset} />
      <Route exact path="/password-reset/:id" component={PasswordUpdate} />
    </Switch>
  </>
);

export default PasswordResetPage;
