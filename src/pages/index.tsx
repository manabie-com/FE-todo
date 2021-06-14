import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import React from "react";
import {ROUTE_PATH, routes} from "config";
import AuthRoute from "../components/AuthRoute";


const App = (): JSX.Element => {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          {routes && routes.length && routes.map(route => (
            (route.isAuth ?
                <AuthRoute {...route}/> : <Route
                key={route.key}
                path={route.path}
                exact={route.exact}
                render={(props) => (<route.comp {...props}/>)}/>
            )))}
          <Redirect from={"/"} to={ROUTE_PATH.SIGN_IN}/>
        </Switch>
      </BrowserRouter>
    </main>
  )
}

export default App;