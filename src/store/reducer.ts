import { Todo, TodoStatus } from "../models/todo";
import { setItemLocalStorage } from "../utils/localStorage.utils";
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_STATUS,
} from "./actions";

export interface AppState {
  todos: Array<Todo>;
}

export const initialState: AppState = {
  todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
  let dataTodos = JSON.parse(JSON.stringify(state.todos));

  switch (action.type) {
    case CREATE_TODO:
      dataTodos.push(action.payload);
      setItemLocalStorage("dataTodos", dataTodos);
      return {
        ...state,
        todos: dataTodos,
      };

    case UPDATE_TODO_STATUS:
      dataTodos = dataTodos.map((todo: Todo) => {
        if (todo.id === action.payload.todoId) {
          todo.status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
        }
        return todo;
      });

      setItemLocalStorage("dataTodos", dataTodos);
      return {
        ...state,
        todos: dataTodos,
      };

    case UPDATE_TODO_CONTENT:
      dataTodos = dataTodos.map((todo: Todo) => {
        if (todo.id === action.payload.todoId) {
          todo.content = action.payload.content;
        }
        return todo;
      });

      setItemLocalStorage("dataTodos", dataTodos);
      return {
        ...state,
        todos: dataTodos,
      };

    case TOGGLE_ALL_TODOS:
      dataTodos = dataTodos.map((e: Todo) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        };
      });

      return {
        ...state,
        todos: dataTodos,
      };

    case DELETE_TODO:
      const index1 = dataTodos.findIndex((todo: Todo) => todo.id === action.payload);
      dataTodos.splice(index1, 1);

      setItemLocalStorage("dataTodos", dataTodos);
      return {
        ...state,
        todos: dataTodos,
      };
    case DELETE_ALL_TODOS:
      setItemLocalStorage("dataTodos", []);

      return {
        ...state,
        todos: [],
      };
    case SET_TODO:
      dataTodos = action.payload;

      return {
        ...state,
        todos: dataTodos,
      };
    default:
      return state;
  }
}

export default reducer;
