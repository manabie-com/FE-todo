import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import Service from '../service';
import HeaderComponent from './HeaderComponent';

export default class PrivateRoute extends Component<any, any> {
  render() {
    const {component: Component, ...rest}: any = this.props;
    const loggedIn = Service.isLoggedIn();

    return (
      <Route
        {...rest}
        render={(props) => {
          if (loggedIn) {
            return (
              <div>
                <HeaderComponent {...props}/>
                <Component {...props}/>
              </div>
            );
          }

          return <Redirect to={
            {pathname: '/login', state: {from: props.location}}
          }/>;
        }}
      />
    );
  }
}
