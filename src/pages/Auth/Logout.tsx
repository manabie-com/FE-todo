import React from 'react';
import { routes } from '../../config/routes';
import { useAuth } from '../../context/authContext';
import { logout } from '../../store/actions/authActions';
import useEffectOnMount from '../../utils/hooks/useEffectOnMount';

interface LogoutPageProps {}

export const LogoutPage: React.FC<LogoutPageProps> = (props) => {
	const { dispatch } = useAuth();
	useEffectOnMount(() => {
		dispatch(logout());
		window.location.href = routes.login;
	});
	return <div />;
};
