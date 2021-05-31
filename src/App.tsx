import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import './styles/App.css';

import { routes } from './config/routes';
import { LoginPage } from './pages/Auth/Login';
import { LogoutPage } from './pages/Auth/Logout';
import { NotFoundPage } from './pages/NotFound';
import TodoPage from './pages/Todo';
import RequiredAuthentication from './utils/auth/RequiredAuthentication';

function App() {
	return (
		<main className="App">
			<div className="App__inner">
				<BrowserRouter>
					<Route exact path={routes.login} component={LoginPage} />
					<Route exact path={routes.logout} component={LogoutPage} />

					<RequiredAuthentication>
						<Switch>
							<Route exact path={routes.index}>
								<Redirect to={routes.todo.index} />
							</Route>

							<Route exact path={routes.todo.index} component={TodoPage} />
							<Route component={NotFoundPage} />
						</Switch>
					</RequiredAuthentication>
				</BrowserRouter>
			</div>
		</main>
	);
}

export default App;
