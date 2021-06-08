import React, { useState } from "react";
import { Todo } from "../../models/todo";
import { isTodoCompleted } from "../../utils";
import { CONFIRM_DELETE_TODO } from "../../constants";

import "./style.css";

interface Props {
  todo: Todo;
  deleteTodo: any;
  updateStatus: any;
  updateContent?: any;
}

const ToDoItem: React.FC<Props> = ({
  todo,
  deleteTodo,
  updateStatus,
  updateContent,
}) => {
  const [inputValue, setInputValue] = useState(todo.content);
  const [allowEdit, setAllowEdit] = useState(false);

  return (
    <div className="to-do-item">
      <input
        type="checkbox"
        checked={isTodoCompleted(todo)}
        onChange={updateStatus}
      />
      {allowEdit && updateContent ? (
        <input
          className="to-do-item__input"
          onKeyDown={async (e: any) => {
            if (e.key === "Enter") {
              let resp = await updateContent(inputValue);
              if (resp === 1) setAllowEdit(false);
            }
          }}
          onChange={(e: any) => setInputValue(e.target?.value)}
          value={inputValue}
          autoFocus
        />
      ) : (
        <span>{todo.content}</span>
      )}
      {allowEdit && updateContent ? (
        <button
          className="to-do-item__edit"
          onClick={() => setAllowEdit(false)}
        >
          Cancel
        </button>
      ) : (
        <button
          className="to-do-item__edit"
          disabled={todo.status === "COMPLETED"}
          onClick={() => setAllowEdit(true)}
        >
          Edit
        </button>
      )}
      <button
        className="to-do-item__delete"
        onClick={() => {
          if (window.confirm(CONFIRM_DELETE_TODO)) deleteTodo();
        }}
      >
        &times;
      </button>
    </div>
  );
};

export default ToDoItem;
