import React, {useRef} from 'react';

import {isTodoCompleted} from '../../utils';
import {Todo} from "../../models/todo";
import {UpdateTodoPayload} from "../../store/actions";

import './todo-item.css';

interface Props {
  item: Todo;
  onChangeItem: (onUpdateTodo: UpdateTodoPayload) => void;
  onDeleteItem: (id: string) => void;
}

const ToDoItem = ({item, onChangeItem, onDeleteItem}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const onClickOutside = React.useCallback((e: MouseEvent) => {
    if (wrapRef.current && !wrapRef.current.contains(e.target as Node) && item.editable) {
      onChangeItem({ editable: false, id: item.id });
    }
  }, [item.editable, item.id, onChangeItem])

  React.useEffect(() => {
    document.addEventListener('click', onClickOutside);
    return () => document.removeEventListener('click', onClickOutside);
  }, [item.editable, onClickOutside]);

  const onChangeContent = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current && inputRef.current.value.trim()) {
      onChangeItem({content: inputRef.current.value, editable: false, id: item.id});
    }
  }, [item.id, onChangeItem])

  const onDoubleClick = React.useCallback(() => {
    if (!item.editable) {
      onChangeItem({editable: true, id: item.id});
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.value = item.content;
      }
    }
  }, [item.editable, item.id, item.content, onChangeItem])

  return (
    <div className="ToDo__item">
      <div role={`item-${item.id}`} className="ToDo__item__content" ref={wrapRef} onDoubleClick={onDoubleClick}>
        <input
          role={`status-checkbox-${item.id}`}
          className={item.editable ? 'hide' : ''}
          type="checkbox"
          checked={isTodoCompleted(item)}
          onChange={(e) => onChangeItem({ checked: e.target.checked, id: item.id })}
        />
        <span role={`content-text-${item.id}`} className={item.editable ? 'hide' : ''}>{item.content}</span>
        <input
          role={`content-input-${item.id}`}
          className={`ToDo__item__content__change ${item.editable ? '' : 'hide'}`}
          type="text"
          ref={inputRef}
          onKeyDown={onChangeContent}
        />
      </div>
      <button
        role={`delete-btn-${item.id}`}
        className="Todo__delete"
        onClick={() => onDeleteItem(item.id)}
      >
          X
      </button>
    </div>
  );
};

export default ToDoItem;
