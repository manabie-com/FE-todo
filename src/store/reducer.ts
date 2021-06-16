import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_CONTENT
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      if (state.todos.filter(e => e.content === action.payload.content).length === 0) {
        state.todos.push(action.payload);
      }
      state = {
        ...state
      };
      break;
    case UPDATE_TODO_STATUS:
      const index2 = state.todos.findIndex((todo) => todo.id === action.payload?.todoId);
      state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      state = {
        ...state,
        todos: state.todos
      }
      break;
    case UPDATE_TODO_CONTENT:
        state.todos = state.todos.map((todo) => {
          if (todo.id === action.payload.todoId) {
            todo.content = action.payload.content
          }
          return todo;
        });
  
        state = {
          ...state,
          todos: state.todos
        }
        break;
    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      state = {
        ...state,
        todos: tempTodos
      }
      break;
    case DELETE_TODO:
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      state = {
        ...state,
        todos: state.todos
      }
      break;
    case DELETE_ALL_TODOS:
      state = {
        ...state,
        todos: []
      };
      break;
    // default:
    //   return state;
  }

  localStorage.setItem('todos', JSON.stringify(state.todos));
  
  return state;
}

export default reducer;