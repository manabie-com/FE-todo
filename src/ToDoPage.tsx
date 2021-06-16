import React, {
  ChangeEvent,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  createTodo,
  deleteAllTodos,
  deleteTodo,
  editTodo,
  setTodos,
  toggleAllTodos,
  updateTodoStatus,
} from "./store/actions";
import reducer, { initialState } from "./store/reducer";

import { RouteComponentProps } from "react-router-dom";
import Service from "./service";
import { TodoStatus } from "./models/todo";
import { isTodoCompleted } from "./utils";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = ({ history }: RouteComponentProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const inputRef = useRef<HTMLInputElement>(null);
  const todoInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { todos } = state;
  const [editData, setEditData] = useState({ todoId: "", isEditable: false });
  const [activeIndex, setIndex] = useState(-1);

  useEffect(() => {
    (async () => {
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      try {
        const resp = await Service.createTodo(inputRef.current.value);
        dispatch(createTodo(resp));
        inputRef.current.value = "";
      } catch (e) {
        if (e.response.status === 401) {
          history.push("/");
        }
      }
    }
  };

  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const showTodos = todos.filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  const toggleEdit = (
    e: React.MouseEvent<Element, MouseEvent>,
    todoId: string,
    index: number
  ) => {
    setEditData({ todoId, isEditable: true });
    setIndex(index);
  };

  const onEditTodo = async (
    e: React.KeyboardEvent<HTMLInputElement>,
    todoId: string,
    index: number
  ) => {
    if (e.key === "Enter" && todoInputRefs.current[index]) {
      const ref = todoInputRefs.current[index];
      if (ref && ref.value) {
        try {
          const resp = await Service.editTodo(todoId, ref.value);
          dispatch(editTodo(resp));
          ref.value = "";
          setEditData({ todoId, isEditable: false });
        } catch (e) {
          if (e.response.status === 401) {
            history.push("/");
          }
        }
      }
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      const { target } = event;
      if (
        activeIndex !== -1 &&
        todoInputRefs !== null &&
        todoInputRefs.current[activeIndex] &&
        todoInputRefs.current[activeIndex] !== null
      ) {
        if (!todoInputRefs.current[activeIndex]?.contains(target as Node)) {
          setEditData({ todoId: editData.todoId, isEditable: false });
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);
  }, [activeIndex, editData, todoInputRefs]);

  const checkActiveFilter = (status: string): string => {
    if (status === showing) {
      return "Todo__filter--active";
    }
    return "";
  };

  return (
    <div className="Todo__container">
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder="What need to be done?"
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className="Todo__list">
        {showTodos.map((todo, index) => {
          return (
            <div
              key={todo.id}
              className={`Todo__item Todo__item--${
                todo.status === "COMPLETED" ? "completed" : "active"
              } ${
                editData.todoId === todo.id && editData.isEditable
                  ? "Todo__item--isEditable"
                  : ""
              }`}
            >
              <input
                type="checkbox"
                checked={isTodoCompleted(todo)}
                onChange={(e) => onUpdateTodoStatus(e, todo.id)}
              />
              <span className="Todo__status">{todo.status}</span>
              <div
                className={`Todo__content Todo__content--${index}`}
                onDoubleClick={(e) => toggleEdit(e, todo.id, index)}
              >
                {(todo.id !== editData.todoId || !editData.isEditable) && (
                  <span className="Todo__content--text">{todo.content}</span>
                )}
                {todo.id === editData.todoId && editData.isEditable && (
                  <input
                    className={`Todo__content--input`}
                    type="text"
                    defaultValue={todo.content}
                    ref={(ref) => {
                      todoInputRefs.current[index] = ref;
                    }}
                    onKeyDown={(e) => onEditTodo(e, todo.id, index)}
                  />
                )}
              </div>
              <button
                className="Todo__delete"
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
      <div className="Todo__toolbar">
        {todos.length > 0 ? (
          <input
            type="checkbox"
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
          />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          <button
            className={`Action__btn Action__btn--all ${checkActiveFilter(
              "ALL"
            )}`}
            onClick={() => setShowing("ALL")}
          >
            All
          </button>
          <button
            className={`Action__btn Action__btn--active ${checkActiveFilter(
              TodoStatus.ACTIVE
            )}`}
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className={`Action__btn Action__btn--completed ${checkActiveFilter(
              TodoStatus.COMPLETED
            )}`}
            onClick={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>
        <button
          className="Action__btn Action__btn--clear"
          onClick={onDeleteAllTodo}
        >
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoPage;
