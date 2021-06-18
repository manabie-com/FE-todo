import React, { useEffect, useReducer, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import reducer, { initialState } from '@store/reducer';
import { createTodo, updateTodoStatus } from '@store/actions';

import Service from '@service/index';
import { TodoStatus, Todo } from '@models/todo';
import { isTodoCompleted } from '@utils/index';

/** Containers */

import CreateTodo from './CreateTodo';
import TodoList from './TodoList';
import ListButton from './ListButton';

/** Styles */
import Styles from './todo.module.css';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {}, []);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      try {
        const resp = await Service.createTodo(inputRef.current.value);
        dispatch(createTodo(resp));
        inputRef.current.value = '';
      } catch (e) {
        if (e.response.status === 401) {
          history.push('/');
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

  const activeTodos = todos.reduce(function (accum: number, todo: Todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  return (
    <div className={Styles.container}>
      <CreateTodo
        activeTodos={activeTodos}
        todos={todos}
        onKeyDown={onCreateTodo}
        inputRef={inputRef}
        dispatch={dispatch}
      />
      <TodoList
        dispatch={dispatch}
        todos={todos}
        showing={showing}
        onUpdateTodoStatus={onUpdateTodoStatus}
      />
      <ListButton
        todos={todos}
        showing={showing}
        setShowing={setShowing}
        dispatch={dispatch}
      />
    </div>
  );
};

export default ToDoPage;
