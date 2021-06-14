import React, { useState } from "react"
import { Todo } from "models/todo"
import { isTodoCompleted } from "utils"
import styles from "./TodoItem.module.css"

interface IProps {
  todo: Todo
  onDelete: (todoId: string) => void
  onMarkDone: (isDone: boolean, todoId: string) => void
  onUpdateTodo: (todoId: string, content: string) => void
}

const TodoItem = (props: IProps): JSX.Element => {
  let editTextFieldRef: HTMLInputElement | null
  const { todo, onDelete, onMarkDone, onUpdateTodo } = props
  const [editable, setEditable] = useState<boolean>(false)
  const [editValue, setEditValue] = useState<string>(todo.content)

  const onChangeContent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && editValue) {
      onUpdateTodo(todo.id, editValue)
      setEditValue("")
      setEditable(false)
    }
  }
  return (
    <div
      className={styles.todoItemContainer}
      tabIndex={0}
      onDoubleClick={(e) => {
        setEditable(true)
        editTextFieldRef?.focus()
      }}
    >
      <label
        className={styles.checkBoxContainer}
        onDoubleClick={(e) => {
          setEditable(true)
          editTextFieldRef?.focus()
        }}
        onClick={(e) => {
          onMarkDone(!isTodoCompleted(todo), todo.id)
          e.preventDefault()
        }}
      >
        {editable ? (
          <input
            autoFocus
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            onChange={(e) => {
              setEditValue(e.target.value)
            }}
            onKeyDown={onChangeContent}
            ref={(input) => {
              editTextFieldRef = input
            }}
            type={"text"}
            onBlur={() => {
              setEditable(false)
              setEditValue(todo.content)
            }}
            className={styles.editTextField}
            value={editValue}
            data-testid="updateInput"
          />
        ) : (
          <span
            className={[
              styles.todoText,
              isTodoCompleted(todo) ? styles.strike : "",
            ].join(" ")}
          >
            {todo.content}
          </span>
        )}
        <input
          id={todo.id}
          type="checkbox"
          checked={isTodoCompleted(todo)}
          onChange={() => {}}
        />
        <span className={styles.checkmark} />
      </label>
      <button
        data-testid="deleteBtn"
        className={styles.removeBtn}
        onClick={(e) => {
          e.stopPropagation()
          onDelete(todo.id)
        }}
      >
        ✕
      </button>
    </div>
  )
}
export default TodoItem
