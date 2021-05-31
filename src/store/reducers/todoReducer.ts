import { Todo, TodoStatus } from '../../models/todo';
import {
	TodoActions,
	CREATE_TODO,
	DELETE_ALL_TODOS,
	DELETE_TODO,
	TOGGLE_ALL_TODOS,
	UPDATE_TODO_STATUS,
	UPDATE_TODO_CONTENT,
} from '../actions/todoActions';

export interface TodoState {
	todos: Array<Todo>;
}

export const initialState: TodoState = {
	todos: [],
};

function todoReducer(state: TodoState, action: TodoActions): TodoState {
	switch (action.type) {
		case CREATE_TODO:
			return {
				...state,
				todos: [...state.todos, action.payload],
			};

		case UPDATE_TODO_STATUS:
			return {
				...state,
				todos: state.todos.map((todo) => {
					if (todo.id === action.payload.todoId) {
						return {
							...todo,
							status: action.payload.checked
								? TodoStatus.COMPLETED
								: TodoStatus.ACTIVE,
						};
					}
					return todo;
				}),
			};

		case UPDATE_TODO_CONTENT:
			return {
				...state,
				todos: state.todos.map((todo) => {
					if (todo.id === action.payload.todoId) {
						return {
							...todo,
							content: action.payload.content,
						};
					}
					return todo;
				}),
			};

		case TOGGLE_ALL_TODOS:
			const tempTodos = state.todos.map((e) => {
				return {
					...e,
					status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
				};
			});

			return {
				...state,
				todos: tempTodos,
			};

		case DELETE_TODO:
			return {
				...state,
				todos: state.todos.filter((todo) => todo.id !== action.payload),
			};

		case DELETE_ALL_TODOS:
			return {
				...state,
				todos: [],
			};

		default:
			return state;
	}
}

export default todoReducer;
