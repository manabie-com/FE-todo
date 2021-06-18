import React from 'react';
import { Todo, TodoStatus } from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  SET_TODO,
  SET_TOKEN,
} from './actions';

const getTodosOfLocalstorage = () => {
  const totosListLocalstorage: any = localStorage.getItem('todos');
  const todos = JSON.parse(totosListLocalstorage);

  if (!Boolean(todos?.length) || typeof todos === 'undefined') {
    return [];
  } else {
    return todos;
  }
};
export interface AppState {
  todos: Array<Todo> | any;
  token: string;
}
export const TodoContext: any = React.createContext(null);

export const initialState: AppState = {
  todos: getTodosOfLocalstorage(),
  token: '',
};

function reducer(state: AppState, action: AppActions): AppState {
  let newListTodo: any;
  switch (action.type) {
    case SET_TODO:
      newListTodo = action.payload;
      localStorage.setItem('todos', JSON.stringify(newListTodo));
      return {
        ...state,
        todos: newListTodo,
      };
    case CREATE_TODO:
      newListTodo = [...state.todos, action.payload];
      localStorage.setItem('todos', JSON.stringify(newListTodo));
      return {
        ...state,
        todos: newListTodo,
      };

    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex(
        (todo: Todo) => todo.id === action.payload.todoId
      );
      state.todos[index2].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;
      localStorage.setItem('todos', JSON.stringify(state.todos));
      return {
        ...state,
        todos: state.todos,
      };

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e: Todo) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });
      localStorage.setItem('todos', JSON.stringify(tempTodos));
      return {
        ...state,
        todos: tempTodos,
      };

    case DELETE_TODO:
      newListTodo = action.payload;
      localStorage.setItem('todos', JSON.stringify(newListTodo));
      return {
        ...state,
        todos: newListTodo,
      };
    case DELETE_ALL_TODOS:
      localStorage.setItem('todos', JSON.stringify([]));
      return {
        ...state,
        todos: [],
      };
    case SET_TOKEN:
      localStorage.setItem('token', JSON.stringify(action.payload));
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
