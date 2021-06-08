import { Todo, TodoStatus } from "../models/todo";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT,
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: JSON.parse(localStorage.getItem("todoStorage") || "[]"),
};

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      state.todos.push(action.payload);
      return {
        ...state,
      };

    case UPDATE_TODO_STATUS:
      let statusIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      // Condition for not existed id
      if (statusIndex > -1)
        state.todos[statusIndex].status = action.payload.checked
          ? TodoStatus.COMPLETED
          : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: state.todos,
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
      // Changed from splice to filter for 2 reasons:
      // 1. When the id is not exist, the index return -1,
      // which will remove the last item from the todo list.
      // 2. Shorter code
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: [],
      };

    case UPDATE_TODO_CONTENT:
      let contentIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId
      );
      if (contentIndex > -1)
        state.todos[contentIndex].content = action.payload.value;

      return {
        ...state,
        todos: state.todos,
      };

    default:
      return state;
  }
}

export default reducer;
