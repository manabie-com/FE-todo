import React, { useEffect, useReducer, useState } from "react"
import { RouteComponentProps } from "react-router-dom"

import todoReducer, { initialState } from "store/reducers/todos"
import {
  createTodo,
  deleteAllTodos,
  deleteTodo,
  setTodos,
  toggleAllTodos,
  updateTodoStatus,
} from "store/actions/todos"
import { TodoService } from "service"
import { TodoStatus } from "models/todo"
import { isTodoCompleted } from "utils"
import TodoInput from "./component/todo-input"
import styles from "./TodoPage.module.css"
import TodoList from "./component/todo-list"
import TodoToolbar from "./component/todo-toolbar"
import TodoFilter from "./component/todo-filter"

type EnhanceTodoStatus = TodoStatus | "ALL"

const ToDoPage = ({ history }: RouteComponentProps): JSX.Element => {
  const [{ todos }, dispatch] = useReducer(todoReducer, initialState)
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL")
  const [todoText, setTodoText] = useState<string>("")

  useEffect(() => {
    ;(async () => {
      const resp = await TodoService.getTodos()
      dispatch(setTodos(resp || []))
    })()
  }, [])

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && todoText) {
      try {
        const resp = await TodoService.createTodo(todoText)
        if (resp.isSuccess) {
          dispatch(createTodo(resp.data))
          setTodoText("")
        }
      } catch (e) {
        if (e.response.status === 401) {
          history.push("/")
        }
      }
    }
  }

  const onUpdateTodos = (todoId: string, content: string) => {
    let index = todos.findIndex((todo) => todo.id === todoId)

    if (index !== -1) {
      let newTodos = todos
      newTodos[index].content = content
      dispatch(setTodos(newTodos))
    }
  }

  const onUpdateTodoStatus = (isDone: boolean, todoId: string) => {
    dispatch(updateTodoStatus(todoId, isDone))
  }

  const onToggleAllTodo = (isCheck: boolean) => {
    dispatch(toggleAllTodos(isCheck))
  }

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos())
  }

  const showTodos = todos.filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED
      default:
        return true
    }
  })

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1
  }, 0)

  return (
    <div className={styles.container}>
      <div className={styles.todoContainer}>
        <h1 className={styles.header}>Todo</h1>
        <TodoInput
          placeholder="What need to be done?"
          onChange={(e) => setTodoText(e.target.value)}
          value={todoText}
          onKeyDown={onCreateTodo}
        />
        <TodoToolbar
          showCheckAll={todos.length > 0}
          isChecked={activeTodos === 0}
          isExistList={!!todos.length}
          onChange={onToggleAllTodo}
          onClear={onDeleteAllTodo}
        />
        <TodoList
          todos={showTodos}
          onMarkDone={onUpdateTodoStatus}
          onUpdateTodo={onUpdateTodos}
          onDelete={(todoId) => dispatch(deleteTodo(todoId))}
        />
        <TodoFilter
          onChangeFilter={(status) => setShowing(status)}
          currentStatus={showing}
        />
      </div>
    </div>
  )
}

export default ToDoPage
