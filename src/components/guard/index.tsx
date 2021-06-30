import React from 'react';
import { Redirect } from "react-router-dom";
import { get as storageGet, tokenName } from '../../utils/storage';

interface Props {
	context: 'auth' | 'no-auth';
	children: React.ReactNode;
}

function Guard({ context, children } : Props) {
	const authToken = storageGet(tokenName);

	if (context === 'auth' && !authToken) {
		console.log(authToken);
		return <Redirect to="/" />;
	}

	if (context === 'no-auth' && authToken) {
		return <Redirect data-testid="todo-page" to="/todo" />;
	}

	return <>{children}</>;
}

export default Guard;
