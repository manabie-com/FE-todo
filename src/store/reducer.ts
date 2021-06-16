import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  EDIT_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS
} from "./actions";
import { Todo, TodoStatus } from "../models/todo";

import { setStorage } from "../utils/storage";

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case SET_TODO:
      return { todos: action.payload };
    case CREATE_TODO:
      // state object should not be mutated
      // state.todos.push(action.payload);
      // return { ...state };
      let newState = { todos: state.todos.concat(action.payload) };
      setStorage('state', newState);
      return newState;

    case UPDATE_TODO_STATUS:
      // state mutation
      // const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      // state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      let status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE;
      let newTodos = state.todos.map((item) => {
        return {
          ...item,
          status: item.id === action.payload.todoId ? status : item.status
        }
      });
      setStorage('state', { todos: [...newTodos] });
      return {
        todos: [...newTodos],
      };

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });
      setStorage('state', { todos: [...tempTodos] });
      return {
        ...state,
        todos: tempTodos,
      };

    case DELETE_TODO:
      // const index1 = state.todos.findIndex(
      //  (todo) => todo.id === action.payload
      //);
      // state.todos.splice(index1, 1);
      const stateAfterDelete = {
        todos: state.todos.filter(item => item.id !== action.payload),
      }
      setStorage('state', stateAfterDelete);
      return stateAfterDelete;

    case DELETE_ALL_TODOS:
      setStorage('state', initialState)
      return initialState;

    case EDIT_TODO:
      let editedTodos = state.todos.map((item) => {
        return {
          ...item,
          content: item.id === action.payload.id ? action.payload.content : item.content
        }
      });
      setStorage('state', { todos: [...editedTodos] });
      return {
        todos: [...editedTodos],
      };
    default:
      return state;
  }
}

export default reducer;
