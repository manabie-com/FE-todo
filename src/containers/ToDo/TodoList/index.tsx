import React, { useRef, useState } from 'react';

/** Components */
import { Input, Button } from '@components/index';

/** Models */
import { Todo, TodoStatus } from '@models/todo';

/** Utils */
import { isTodoCompleted } from '@utils/index';

/** Actions */
import { deleteTodo, setTodos } from '@store/actions';

/** Hooks */
import useOnClickOutside from '@hooks/useOnClickOutSide';

import Styles from './todoList.module.css';

type ITodoList = {
  onUpdateTodoStatus: any;
  showing: string;
  todos: Todo[] | any;
  dispatch: any;
};

const TodoList = ({
  showing,
  onUpdateTodoStatus,
  todos,
  dispatch,
}: ITodoList) => {
  const refItem = useRef(null);
  const [content, setContent] = useState('');

  const onDeleteTodo = (id: string) => {
    const newTodo = showTodos.filter((todo: Todo) => {
      return todo.id !== id;
    });
    dispatch(deleteTodo(newTodo));
  };

  let showTodos = todos.filter((todo: Todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const onEditTodo = (id: string) => {
    setContent(todos.filter((todo: Todo) => todo.id === id)[0].content);
    const newData = todos.map((todo: Todo) => ({
      ...todo,
      isEdit: todo.id === id ? true : false,
    }));
    dispatch(setTodos(newData));
  };

  const onEnterTodo = (e: any, id: string) => {
    if (
      e.key === 'Enter' &&
      todos.filter((todo: Todo) => !Boolean(todo.content)).length === 0
    ) {
      const newData = todos.map((todo: Todo) => ({
        ...todo,
        content: todo.id === id ? content : todo.content,
        isEdit: false,
      }));
      dispatch(setTodos(newData));
      setContent(newData);
    }
  };

  const onChangeItemTodo = (e: any, id: string) => {
    const newData = todos.map((todo: Todo) => ({
      ...todo,
      content: todo.id === id ? e.target.value : todo.content,
    }));
    dispatch(setTodos(newData));
    setContent(e.target.value);
  };

  useOnClickOutside(refItem, () => {
    const newData = todos.map((todo: Todo) => ({
      ...todo,
      isEdit: false,
    }));
    dispatch(setTodos(newData));
  });

  return (
    <div className={Styles.container}>
      {showTodos.length !== 0 ? (
        showTodos.map((todo: Todo, index: number) => {
          return (
            <div className={Styles.todo} key={index}>
              <div className={Styles.nameTodo}>
                <Input
                  className={Styles.checkbox}
                  type='checkbox'
                  checked={isTodoCompleted(todo)}
                  onChange={(e: any) => onUpdateTodoStatus(e, todo.id)}
                />
                {todo.isEdit ? (
                  <Input
                    ref={refItem}
                    value={content}
                    onKeyDown={(e: any) => onEnterTodo(e, todo.id)}
                    onChange={(e: any) => onChangeItemTodo(e, todo.id)}
                  />
                ) : (
                  <span
                    onDoubleClick={
                      todo.status === TodoStatus.ACTIVE
                        ? () => onEditTodo(todo.id)
                        : undefined
                    }
                    className={
                      todo.status === TodoStatus.COMPLETED
                        ? Styles.completed
                        : Styles.active
                    }
                  >
                    {todo.content}
                  </span>
                )}
              </div>
              <Button
                className={Styles.remove}
                type='button'
                onClick={() => onDeleteTodo(todo.id)}
              >
                X
              </Button>
            </div>
          );
        })
      ) : (
        <div className={Styles.recondFound}>No record found</div>
      )}
    </div>
  );
};

export default TodoList;
