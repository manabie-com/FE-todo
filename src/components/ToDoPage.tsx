import React, {useEffect, useReducer, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import reducer, {initialState} from '../store/reducer';
import IndependentInputComponent from './IndependentInputComponent';
import {
  createTodo,
  deleteAllTodos,
  deleteTodo,
  setTodos,
  toggleAllTodos,
  updateTodoContent,
  updateTodoStatus,
} from '../store/actions';
import Service from '../service';
import {Todo, TodoStatus} from '../models/todo';
import {isTodoCompleted} from '../utils';

type EnhanceTodoStatus = TodoStatus | 'ALL';

const ToDoPage = ({history}: RouteComponentProps) => {
  const [{todos}, dispatch] = useReducer(reducer, initialState);
  const [showing, setShowing] = useState<EnhanceTodoStatus>('ALL');

  useEffect(() => {
    (async () => {
      // FIXME: Load todos first time and dispatch to store
      const resp = await Service.getTodos();

      dispatch(setTodos(resp || []));
    })();
  }, []);

  const onCreateTodo = async (e: HTMLInputElement) => {
    /* - We must to check "Enter" keyword multi time (create todos, edit todos)
       - Need to trim value before create todos
       FIXME: So I create "IndependentInputComponent" to handle this
     */
    try {
      if (e.value?.trim()) {
        const resp = await Service.createTodo(e.value.trim());
        dispatch(createTodo(resp));
      }
    } catch (e) {
      if (e.response.status === 401) {
        history.push('/');
      }
    }
  };

  const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    dispatch(updateTodoStatus(todoId, e.target.checked));
  };

  const onUpdateTodoContent = (e: HTMLInputElement, todoId: string) => {
    if (e.value.trim()) {
      dispatch(updateTodoContent(todoId, e.value.trim()));
    }
  };

  const onDeleteTodo = ({id, content}: Todo) => {
    /* - Need to confirm before delete
       FIXME: I used "window.confirm" to handle this
     */
    const result = window.confirm(`Do you really want to delete todo "${content}"?`);

    if (result) {
      dispatch(deleteTodo(id));
    }
  };

  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    // No need to do anything if dont have any todos
    if (!todos.length) {
      return;
    }

    /* - Need to confirm before delete all
       FIXME: I used "window.confirm" to handle this
     */
    const result = window.confirm('Do you really want to delete all todo?');

    if (result) {
      dispatch(deleteAllTodos());
    }
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

  return (
    <div className="container small-container" style={{marginBottom: '3rem'}}>
      {
        /* - We must to check "Enter" keyword multi time (create todos, edit todos)
           FIXME: So I create "IndependentInputComponent" to handle this
         */
      }
      <IndependentInputComponent
        className="Todo__input"
        placeholder="What need to be done?"
        onEnter={onCreateTodo}
        clearOnEnter={true}
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '50% 50%',
        marginTop: '15px',
        padding: '0 7px',
      }}>
        {todos.length > 0 ?
          <input
            type="checkbox"
            checked={activeTodos === 0}
            onChange={onToggleAllTodo}
          /> : <div/>
        }
        <button className="Action__btn" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>

      <div>
        {
          showTodos.map((todo, index) => {
            return (
              <div key={index} className={`ToDo__item ${todo.status === TodoStatus.COMPLETED ? 'active' : ''}`}>
                <input
                  type="checkbox"
                  checked={isTodoCompleted(todo)}
                  onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                />
                <IndependentInputComponent
                  value={todo.content}
                  onEnter={(e: any) => onUpdateTodoContent(e, todo.id)}
                  doubleClickToActive={true}
                  style={{backgroundColor: 'transparent', border: 0}}
                />
                <button
                  className="Todo__delete"
                  onClick={() => onDeleteTodo(todo)}
                >
                  X
                </button>
              </div>
            );
          })
        }
      </div>

      <footer style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      }}>
        <div className="container small-container" style={{
          paddingTop: 0,
          paddingBottom: 0,
          display: 'grid',
          gridTemplateColumns: '33.33% 33.34% 33.33%',
        }}>
          <button
            className={`Action__btn ${'ALL' === showing ? 'active' : ''}`}
            style={{borderRadius: 0}}
            onClick={() => setShowing('ALL')}
          >
            All
          </button>
          <button
            className={`Action__btn ${TodoStatus.ACTIVE === showing ? 'active' : ''}`}
            onClick={() => setShowing(TodoStatus.ACTIVE)}
          >
            Active
          </button>
          <button
            className={`Action__btn ${TodoStatus.COMPLETED === showing ? 'active' : ''}`}
            onClick={() => setShowing(TodoStatus.COMPLETED)}
          >
            Completed
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ToDoPage;
