import React from "react"
import styles from "./TodoToolBar.module.css"

const TodoToolbar = (props: {
  showCheckAll: boolean
  isChecked: boolean
  onChange: (isCheck: boolean) => void
  onClear: () => void
  isExistList: boolean
}): JSX.Element => {
  const { showCheckAll, isChecked, onChange, onClear, isExistList } = props
  return (
    <div className={styles.toolBarContainer}>
      {showCheckAll ? (
        !isChecked ? (
          <div
            className={[styles.actionBtn, styles.markAll].join(" ")}
            onClick={() => onChange(true)}
          >
            Mark all done
          </div>
        ) : (
          <div
            className={[styles.actionBtn, styles.markAll].join(" ")}
            onClick={() => onChange(false)}
          >
            Unmark all
          </div>
        )
      ) : (
        <div />
      )}
      {isExistList ? (
        <div
          className={[styles.actionBtn, styles.clearAll].join(" ")}
          onClick={onClear}
        >
          Clear all todos
        </div>
      ) : (
        ""
      )}
    </div>
  )
}
export default TodoToolbar
