import React, {Component} from 'react';

import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import SignInPage from './components/SignInPage';
import ToDoPage from './components/ToDoPage';
import NotFoundPage from './components/NotFoundPage';

export default class App extends Component<any, any> {
  render() {
    /* The old route is not security:
       - We can access any page without authentication
       - After authorizing, the use can access login page
       FIXME: So I created 2 component "PublicRoute" & "PrivateRoute" to handle the permission

       We must to handle "not found" page
       FIXME: I created component "NotFoundPage" to handle this
     */
    return (
      <main className="App">
        <BrowserRouter>
          <Switch>
            <PublicRoute exact path="/login" component={SignInPage}/>
            <Route exact path="/">
              <Redirect to="/todo"/>
            </Route>
            <PrivateRoute exact path="/todo" component={ToDoPage}/>
            <Route component={NotFoundPage}/>
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}
