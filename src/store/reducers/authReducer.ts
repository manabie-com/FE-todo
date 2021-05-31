import { AuthActions, LOGIN, LOGOUT } from '../actions/authActions';

export interface AuthState {
	isAuthenticated: boolean;
	token: string | null;
}

export const initialState: AuthState = { isAuthenticated: false, token: null };

function authReducer(state: AuthState, action: AuthActions): AuthState {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				isAuthenticated: true,
				token: action.payload,
			};

		case LOGOUT:
			return {
				...state,
				isAuthenticated: false,
				token: null,
			};

		default:
			return state;
	}
}

export default authReducer;
