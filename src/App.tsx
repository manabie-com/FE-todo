import React, {Suspense} from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom';

import routes from './route/routes'

import './styles/App.css';

function App() {

  const loading = <div>Loading..</div>;
  
  return (
    <main className="App">
      <Suspense fallback={loading}>
        <BrowserRouter>
          <Switch>
            {routes.map(route => <Route key={route.name} path={route.path} exact={route.exact} component={route.component}/>)}
          </Switch>
        </BrowserRouter>
      </Suspense>
    </main>
  );
}

export default App;
