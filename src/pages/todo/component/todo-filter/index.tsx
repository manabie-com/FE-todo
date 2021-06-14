import React from "react"
import { TodoStatus } from "models/todo"
import styles from "./TodoFilter.module.css"

type EnhanceTodoStatus = TodoStatus | "ALL"

const TodoFilter = (props: {
  currentStatus: EnhanceTodoStatus
  onChangeFilter: (status: EnhanceTodoStatus) => void
}): JSX.Element => {
  const { onChangeFilter, currentStatus } = props
  return (
    <div className={styles.filterContainer}>
      <button
        className={[
          styles.filterBtn,
          styles.all,
          currentStatus === "ALL" ? styles.current : "",
        ].join(" ")}
        onClick={() => onChangeFilter("ALL")}
      >
        All
      </button>
      <button
        className={[
          styles.filterBtn,
          styles.active,
          currentStatus === TodoStatus.ACTIVE ? styles.current : "",
        ].join(" ")}
        onClick={() => onChangeFilter(TodoStatus.ACTIVE)}
      >
        Active
      </button>
      <button
        className={[
          styles.filterBtn,
          styles.completed,
          currentStatus === TodoStatus.COMPLETED ? styles.current : "",
        ].join(" ")}
        onClick={() => onChangeFilter(TodoStatus.COMPLETED)}
      >
        Completed
      </button>
    </div>
  )
}

export default TodoFilter
