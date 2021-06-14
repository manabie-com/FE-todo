import React from "react"
import { Todo } from "models/todo"
import styles from "./TodoList.module.css"
import TodoItem from "./component/todo-item"

interface IProps {
  todos: Todo[]
  onDelete: (todoId: string) => void
  onMarkDone: (isDone: boolean, todoId: string) => void
  onUpdateTodo: (todoId: string, content: string) => void
}

const TodoList = (props: IProps): JSX.Element => {
  const { todos, onDelete, onMarkDone, onUpdateTodo } = props
  return (
    <div className={styles.todoListContainer}>
      {todos && todos.length ? (
        todos.map((todo: Todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onMarkDone={onMarkDone}
              onUpdateTodo={onUpdateTodo}
            />
          )
        })
      ) : (
        <h1>Empty List</h1>
      )}
    </div>
  )
}

export default TodoList
