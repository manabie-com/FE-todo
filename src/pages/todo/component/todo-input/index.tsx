import React from "react"
import styles from "./TodoInput.module.css"

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const TodoInput = (props: IProps): JSX.Element => {
  return (
    <div className={styles.todoInputContainer}>
      <input className={styles.todoInput} {...props} data-testid="todoInput" />
    </div>
  )
}

export default TodoInput
