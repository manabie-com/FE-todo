import React, { useContext } from 'react';

import Styles from './createTodo.module.css';
import { Input, Button } from '@components/index';

/** Actions */
import { toggleAllTodos, setToken } from '@store/actions';
import { TodoContext } from '@store/reducer';

type ICreateTodoProps = {
  onKeyDown: any;
  inputRef: any;
  todos: any;
  dispatch: any;
  activeTodos: number;
};

const CreateTodo = ({
  onKeyDown,
  inputRef,
  todos,
  activeTodos,
}: ICreateTodoProps) => {
  const [dispatch] = useContext(TodoContext);
  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onLogout = () => {
    localStorage.setItem('token', '');
    window.location.reload();
  };

  return (
    <div className={Styles.container}>
      <Input
        ref={inputRef}
        placeholder='What need to be done?'
        onKeyDown={onKeyDown}
        className={Styles.input}
      />
      {todos.length > 0 ? (
        <Input
          labelName='Check all'
          type='checkbox'
          checked={activeTodos === 0}
          onChange={onToggleAllTodo}
          classNameLabel={Styles.label}
          classNameContainerInput={Styles.boxInput}
        />
      ) : (
        <div />
      )}
      <Button type='button' onClick={() => onLogout()}>
        Logout
      </Button>
    </div>
  );
};

export default React.forwardRef(CreateTodo);
