import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { SignIn, ToDo } from '@containers/index';

const renderRouter = (
  rest: any,
  condition: boolean,
  Component: any,
  path: string
) => {
  return (
    <Route
      {...rest}
      render={(props: any) => {
        if (condition) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: path,
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
};

const PrivateComponent = ({ component: Component, auth, ...rest }: any) => {
  return renderRouter(rest, auth, Component, '/login');
};

const PublicComponent = ({ component: Component, auth, ...rest }: any) => {
  return renderRouter(rest, !auth, Component, '/');
};

const routes = ({ token }: any) => {
  const tokenInLocalstorage = localStorage.getItem('token');
  let tokenAuth;
  if (Boolean(tokenInLocalstorage)) {
    tokenAuth = tokenInLocalstorage;
  } else {
    tokenAuth = token;
  }

  return (
    <Router>
      <Switch>
        <PublicComponent
          auth={Boolean(tokenAuth)}
          path='/login'
          exact
          component={SignIn}
        />
        <PrivateComponent auth={Boolean(tokenAuth)} path='/' component={ToDo} />
      </Switch>
    </Router>
  );
};

export default routes;
