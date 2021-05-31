import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { TodoActions } from '../store/actions/todoActions';
import todoReducer, {
	initialState,
	TodoState,
} from '../store/reducers/todoReducer';
import { Context } from './types';

const TodoContext = createContext<Context<TodoState, TodoActions>>({
	state: initialState,
	dispatch: (a) => {},
});

const TodoProvider: React.FC = ({ children }) => {
	const STORAGE_KEY = 'todos';
	const [state, dispatch] = useReducer(todoReducer, initialState, (state) => {
		const persistedTodos = localStorage.getItem(STORAGE_KEY);
		const todos = persistedTodos ? JSON.parse(persistedTodos) : [];
		return { ...state, todos };
	});

	// save data on every change
	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
	}, [state]);

	return (
		<TodoContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</TodoContext.Provider>
	);
};

function useTodos() {
	return useContext(TodoContext);
}

export { TodoProvider, TodoContext, useTodos };
