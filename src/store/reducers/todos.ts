import { Todo, TodoStatus } from "../../models/todo"
import {
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  SET_TODO,
  TodoAction,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
} from "../actions/todos"

export interface TodoState {
  todos: Array<Todo>
}

export const initialState: TodoState = {
  todos: [],
}

const saveToLocal = (todos: Array<Todo>) =>
  localStorage.setItem("todos", JSON.stringify(todos))

const todos = (
  state: TodoState = initialState,
  action: TodoAction,
): TodoState => {
  switch (action.type) {
    case CREATE_TODO:
      state.todos.push(action.payload)
      saveToLocal(state.todos)
      return {
        ...state,
      }

    case SET_TODO:
      state.todos = action.payload
      saveToLocal(state.todos)
      return {
        ...state,
      }

    case UPDATE_TODO_STATUS:
      const updateIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload.todoId,
      )
      state.todos[updateIndex].status = action.payload.checked
        ? TodoStatus.COMPLETED
        : TodoStatus.ACTIVE
      saveToLocal(state.todos)
      return {
        ...state,
        todos: state.todos,
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e) => {
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE,
        }
      })

      return {
        ...state,
        todos: tempTodos,
      }

    case DELETE_TODO:
      const deleteIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload,
      )
      state.todos.splice(deleteIndex, 1)
      saveToLocal(state.todos)
      return {
        ...state,
        todos: state.todos,
      }
    case DELETE_ALL_TODOS:
      saveToLocal([])
      return {
        ...state,
        todos: [],
      }
    default:
      localStorage.setItem("todos", JSON.stringify(state.todos))
      return state
  }
}

export default todos
