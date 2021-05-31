import React from 'react';
import {
	Redirect,
	Route,
	RouteComponentProps,
	RouteProps,
} from 'react-router-dom';

import { routes } from '../config/routes';
import { useAuth } from '../context/authContext';

interface PrivateRouteProps extends RouteProps {
	component: ({ history }: RouteComponentProps<{}>) => JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
	component: Component,
	...rest
}) => {
	const { state } = useAuth();
	return (
		<Route
			{...rest}
			render={(routeProps) =>
				state.isAuthenticated ? (
					<Component {...routeProps} />
				) : (
					<Redirect
						to={{
							pathname: routes.login,
							state: { from: routeProps.location },
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
