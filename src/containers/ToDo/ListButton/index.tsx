import React from 'react';

/** Components */
import { Button } from '@components/index';

/** Actions */
import { deleteAllTodos } from '@store/actions';

/** Models */
import { TodoStatus, Todo } from '@models/todo';

/** Styles */
import Styles from './listButton.module.css';

type IListButtionProps = {
  dispatch: any;
  setShowing: any;
  showing: string;
  todos: Todo[];
};

const ListButton = ({
  setShowing,
  dispatch,
  showing,
  todos,
}: IListButtionProps) => {
  const onDisabled = (button: any, todos: Todo[]) => {
    if (todos.length === 0 && button.name === TodoStatus.CLEAR_ALL_TODOS) {
      return true;
    }
    if (
      todos.filter((todo: Todo) => todo.status === TodoStatus.ACTIVE).length ===
        0 &&
      button.name === TodoStatus.ACTIVE
    ) {
      return true;
    }
    if (
      todos.filter((todo: Todo) => todo.status === TodoStatus.COMPLETED)
        .length === 0 &&
      button.name === TodoStatus.COMPLETED
    ) {
      return true;
    }
    return false;
  };

  const renderListButton = (button: any, func: any, todos: Todo[]) => {
    const getNameButton = () => {
      const splitName = button.name.replaceAll('_', ' ').toLocaleLowerCase();
      return (
        `${splitName.charAt(0)}`.toLocaleUpperCase() +
        `${splitName.slice(1)}`.toLocaleLowerCase()
      );
    };
    return (
      <Button
        className={showing === button.enum ? Styles.clicked : undefined}
        type='button'
        onClick={func}
        disabled={onDisabled(button, todos)}
      >
        {getNameButton()}
      </Button>
    );
  };

  const buttons = [
    {
      name: TodoStatus.ALL,
      function: () => setShowing(TodoStatus.ALL),
    },
    {
      name: TodoStatus.ACTIVE,
      function: () => setShowing(TodoStatus.ACTIVE),
    },
    {
      name: TodoStatus.COMPLETED,
      function: () => setShowing(TodoStatus.COMPLETED),
    },
    {
      name: TodoStatus.CLEAR_ALL_TODOS,
      function: () => dispatch(deleteAllTodos()),
    },
  ];

  const renderButton = (button: any, index: number, todos: Todo[]) => {
    return (
      <div key={`${button.name}_${index}`}>
        {renderListButton(button, button.function, todos)}
      </div>
    );
  };

  return (
    <div className={Styles.container}>
      {buttons.map((button: any, index: number) => {
        return renderButton(button, index, todos);
      })}
    </div>
  );
};

export default ListButton;
