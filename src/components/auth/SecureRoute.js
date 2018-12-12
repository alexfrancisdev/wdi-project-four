import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../../lib/auth';

const SecureRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to='/landing' />
      )
    } />
  );
};

export default SecureRoute;
