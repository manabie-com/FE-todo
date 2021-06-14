import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_STATUS,
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: [],
};

function reducer(state: AppState, action: AppActions): AppState {
  /* - Naming index1 index2 index3 ... is not good for the meaning
     FIXME: use {...} to fix this problem

     - Store todos list to localStorage every action
     TODO: need to optimize later, because I think calling localStorage here is not clear
   */
  switch (action.type) {
    // FIXME: Set todos first time
    case SET_TODO: {
      return {...state, todos: [...action.payload]};
    }
    /* - React run all action 2 times (because of trick mode)
       FIXME: So I must to check the existed todos first
     */
    case CREATE_TODO: {
      if (!state.todos.includes(action.payload)) {
        state.todos.push(action.payload);
        localStorage.setItem('todoList', JSON.stringify(state.todos));
      }

      return {...state};
    }
    case UPDATE_TODO_STATUS: {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      localStorage.setItem('todoList', JSON.stringify(state.todos));

      return {...state};
    }
    case UPDATE_TODO_CONTENT: {
      const index = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      state.todos[index].content = action.payload.content;
      localStorage.setItem('todoList', JSON.stringify(state.todos));

      return {...state};
    }
    case TOGGLE_ALL_TODOS: {
      // FIXME: I think we just need to update the status, no need to re-assign to another parameter
      state.todos.forEach((todo) => {
        todo.status = action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      });
      localStorage.setItem('todoList', JSON.stringify(state.todos));

      return {...state};
    }
    case DELETE_TODO: {
      // FIXME: I think use filter is little bit faster than find index & delete
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem('todoList', JSON.stringify(state.todos));

      return {...state};
    }
    case DELETE_ALL_TODOS: {
      localStorage.removeItem('todoList');
      return {...state, todos: []};
    }
    default: {
      return {...state};
    }
  }
}

export default reducer;
