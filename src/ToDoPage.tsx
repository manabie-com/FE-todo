import React, { useEffect, useReducer, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import reducer, { initialState } from "./store/reducer";
import {
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateTodoContent,
} from "./store/actions";
import Service from "./service";
import { TodoStatus } from "./models/todo";
import { isTodoCompleted } from "./utils";
import {
  CONFIRM_CLEAR_ALL_TODOS,
  TODO_PLACEHOLDER,
  CREATED_SUCCESS,
  CREATED_FAILED,
  UPDATED_SUCCESS,
  UPDATED_FAILED,
  DELETED_SUCCESS,
  CLEARED_SUCCESS,
  ALL_TOOLTIP,
  ACTIVE_TOOLTIP,
  COMPLETED_TOOLTIP,
  CLEAR_ALL_TOOLTIP,
} from "./constants";
import ActionButton from "./components/ActionButton";
import ToDoItem from "./components/ToDoItem";
import Notification from "./components/Notification";
import shortid from "shortid";

type EnhanceTodoStatus = TodoStatus | "ALL";

const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>("ALL");
  const [notify, setNotify] = useState<Object[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  let notifyItem = null;

  // Update the todo list into local storage
  useEffect(() => {
    localStorage.setItem("todoStorage", JSON.stringify(todos));
  }, [{ todos }]);

  // Show notification with unique id
  const showNotification = (type: string, message: string) => {
    notifyItem = {
      id: shortid(),
      type: type,
      message: message,
    };
    setNotify([...notify, notifyItem]);
  };

  const removeNotification = (id: number) => {
    notify.filter((item: any) => item.id !== id);
    setNotify(notify.filter((item: any) => item.id !== id));
  };

  // Create a new todo
  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      try {
        if (inputRef.current.value?.trim()) {
          const resp = await Service.createTodo(inputRef.current.value);
          dispatch(createTodo(resp));
          showNotification("Success", CREATED_SUCCESS);
        } else showNotification("Error", CREATED_FAILED);
        inputRef.current.value = "";
      } catch (e) {
        if (e.response.status === 401) {
          history.push("/");
        }
      }
    }
  };

  // Update todo's content
  const onUpdateTodoContent = (value: string, todoId: string) => {
    if (!value) {
      showNotification("Error", UPDATED_FAILED);
      return -1;
    } else {
      dispatch(updateTodoContent(todoId, value));
      showNotification("Success", UPDATED_SUCCESS);
      return 1;
    }
  };

  // Update todo's status
  const onUpdateTodoStatus = (
    e: React.ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  // Toggle all todo
  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  // Clear all todo
  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
    setShowing("ALL");
    showNotification("Success", CLEARED_SUCCESS);
  };

  // Filter todo (active, completed)
  const showTodos = todos?.filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const activeTodos = todos?.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  // Define some action button list
  const actionList = [
    {
      value: "ALL",
      action: () => setShowing("ALL"),
      isDisabled: false,
      tooltip: ALL_TOOLTIP,
    },
    {
      value: TodoStatus.ACTIVE,
      action: () => setShowing(TodoStatus.ACTIVE),
      isDisabled: false,
      tooltip: ACTIVE_TOOLTIP,
    },
    {
      value: TodoStatus.COMPLETED,
      action: () => setShowing(TodoStatus.COMPLETED),
      isDisabled: false,
      tooltip: COMPLETED_TOOLTIP,
    },
    {
      value: "CLEAR ALL",
      action: () => {
        if (window.confirm(CONFIRM_CLEAR_ALL_TODOS)) onDeleteAllTodo();
      },
      isDisabled: todos?.length < 1,
      tooltip: CLEAR_ALL_TOOLTIP,
    },
  ];

  // Delete todo
  const onDeleteToto = (id: any) => {
    dispatch(deleteTodo(id));
    showNotification("Success", DELETED_SUCCESS);
  };

  // Showing Total Item
  const totalItems = () => {
      switch (showing) {
        case TodoStatus.ACTIVE:
          return activeTodos;
        case TodoStatus.COMPLETED:
          return todos.length - activeTodos;
        default:
          return todos.length;
      }
  }

  return (
    <div className="ToDo__container">
      <h1 className="ToDo__title">Todo List</h1>
      <div className="Todo__creation">
        <input
          ref={inputRef}
          className="Todo__input"
          placeholder={TODO_PLACEHOLDER}
          onKeyDown={onCreateTodo}
        />
      </div>
      <div className="Todo__toolbar">
        {todos?.length > 0 ? (
          <input
            type="checkbox"
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
          />
        ) : (
          <div />
        )}
        <ActionButton actionList={actionList} currentShowing={showing} />
      </div>
      <div className="ToDo__list">
        {showTodos?.map((todo, index) => {
          return (
            <ToDoItem
              key={index}
              todo={todo}
              deleteTodo={() => onDeleteToto(todo.id)}
              updateStatus={(e: any) => onUpdateTodoStatus(e, todo.id)}
              updateContent={(value: string) =>
                onUpdateTodoContent(value, todo.id)
              }
            />
          );
        })}
      </div>
      <i className="ToDo__count">{totalItems()} item(s) in total</i>
      <Notification
        notifyList={notify}
        position="bottom-right"
        autoDelete={true}
        removeNotification={removeNotification}
      />
    </div>
  );
};

export default ToDoPage;
