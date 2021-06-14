import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import Service from '../service';

export default class PublicRoute extends Component<any, any> {
  render() {
    const {component: Component, ...rest}: any = this.props;
    const loggedIn = Service.isLoggedIn();

    return (
      <Route
        {...rest}
        render={(props) => {
          if (loggedIn) {
            return <Redirect to={
              {pathname: '/', state: {from: props.location}}
            }/>;
          }

          return <Component {...props}/>;
        }}
      />
    );
  }
}
