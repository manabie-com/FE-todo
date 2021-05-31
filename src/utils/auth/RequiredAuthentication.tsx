import React, { ReactElement } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { routes } from '../../config/routes';
import { useAuth } from '../../context/authContext';

interface Props {
	children: ReactElement<any, any> | null;
}
const RequiredAuthentication: React.FC<Props> = ({ children }) => {
	const location = useLocation();
	const {
		state: { isAuthenticated },
	} = useAuth();

	// if logged in and go to `/login` => redirect to `/`
	if (isAuthenticated && location.pathname.includes(routes.login)) {
		return <Redirect to={routes.index} />;
	}

	// if not logged in and in public routes  => don't render protected routes
	if ([routes.logout].includes(location.pathname)) {
		return null;
	}

	// if not logged in and in protected routes  => redirect to `/login`
	if (!isAuthenticated) {
		return (
			<Redirect
				to={routes.login.concat(
					[routes.login, routes.logout].includes(location.pathname)
						? ''
						: `?path=${encodeURIComponent(location.pathname)}`
				)}
			/>
		);
	}

	return children;
};

export default RequiredAuthentication;
