import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import SignInPage from './pages/SignInPage';
import ToDoPage from './pages/ToDoPage';
import Guard from './components/guard';

import './App.css';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={() => (
            <Guard context="no-auth">
              <SignInPage />
            </Guard>
          )}/>
          <Route path="/todo" render={props => (
            <Guard context="auth">
              <ToDoPage {...props} />
            </Guard>
          )}/>
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
