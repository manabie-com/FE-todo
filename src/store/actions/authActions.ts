export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export interface LoginAction {
	type: typeof LOGIN;
	payload: string;
}

export function login(token: string): LoginAction {
	return {
		type: LOGIN,
		payload: token,
	};
}

///////////
export interface LogoutAction {
	type: typeof LOGOUT;
}

export function logout(): LogoutAction {
	return {
		type: LOGOUT,
	};
}

export type AuthActions = LoginAction | LogoutAction;
