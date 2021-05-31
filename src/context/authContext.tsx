import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { AuthActions } from '../store/actions/authActions';
import authReducer, {
	AuthState,
	initialState,
} from '../store/reducers/authReducer';
import { Context } from './types';

const AuthContext = createContext<Context<AuthState, AuthActions>>({
	state: initialState,
	dispatch: (a) => {},
});

const AuthProvider: React.FC = ({ children }) => {
	const STORAGE_KEY = 'token';
	const [state, dispatch] = useReducer(authReducer, initialState, (state) => {
		const token = localStorage.getItem(STORAGE_KEY);
		return {
			...state,
			isAuthenticated: !!token,
			token,
		};
	});

	// save data on every change
	useEffect(() => {
		state.token
			? localStorage.setItem(STORAGE_KEY, state.token)
			: localStorage.removeItem(STORAGE_KEY);
	}, [state.token]);

	return (
		<AuthContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

function useAuth() {
	return useContext(AuthContext);
}

export { AuthProvider, AuthContext, useAuth };
