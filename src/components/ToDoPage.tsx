import React, {useEffect, useRef, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {
    setTodos,
    createTodo,
    deleteTodo,
    toggleAllTodos,
    deleteAllTodos,
    updateTodoStatus,
    updateTodoContent,
} from '../store/actions';
import Service from '../service';
import {TodoStatus, Todo, ActionUpadte} from '../models/todo';
import {isTodoCompleted} from '../utils';
import {useDispatch, useStoreState, updateStore} from '../context/TodoContext';

type EnhanceTodoStatus = TodoStatus | 'ALL';
type StateEditText = {} | any;

const ToDoPage = ({history}: RouteComponentProps) => {
    // Do not declare useReducer inside function ==> reason duplication state, data should through via
    const {todos} = useStoreState();
    console.log('todos--', todos);
    
    const dispatch = useDispatch();
    const [active, setActive] = useState<EnhanceTodoStatus>('ALL');
    const [showText, setShowText] = useState<StateEditText>({});
    const inputRef = useRef<HTMLInputElement>(null);
    const [showListTodos, setListTodos] = useState<Todo[]>(todos);

    useEffect(()=>{
        (async ()=>{
            const resp = await Service.getTodos();
            console.log('useEffect', resp);
            updateStore(dispatch, setTodos(resp || []))
        })()
    }, [dispatch])

    

    const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputRef.current?.value) {
            try {
                const resp = await Service.createTodo(inputRef.current.value);
                console.log('onCreateTodo');
                // dispatch(createTodo(resp));
                updateStore(dispatch, createTodo(resp));
                inputRef.current.value = '';
                setListTodos(todos);
            } catch (error) {
                console.log('error', error);
                if (error) {
                    history.push('/')
                }
            }
        }
    }

    const onUpdateText = async (e: React.KeyboardEvent<HTMLInputElement>, todo: Todo) => {
        if (e.key === 'Enter') {
            console.log('onUpdateText', todo.content ,  showText.content);
            if (todo.content !== showText.content) {
                updateStore(dispatch, updateTodoContent(todo.id, showText.content));
            }
            setShowText({});
        }
    }

    const onUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        // dispatch(updateTodoStatus(todoId, e.target.checked))
        updateStore(dispatch, updateTodoStatus(todoId, e.target.checked));
    }

    const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        // dispatch(toggleAllTodos(e.target.checked))
        const t = todos.map(todo => {
            todo.status = e.target.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
            return todo;
        })
        setListTodos(t);
        // setListTodos()
        updateStore(dispatch, toggleAllTodos(e.target.checked));
    }

    const removeItem = (todoId: string) => {
        const t = todos.filter(todo => todo.id !== todoId)
        setListTodos(t);
        updateStore(dispatch, deleteTodo(todoId));
    }

    const onDeleteAllTodo = () => {
        // dispatch(deleteAllTodos());
        updateStore(dispatch, deleteAllTodos());
        setActive('ALL')
        setListTodos([]);
    }

    const onChangeText =(e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log('e.target', e.target.value);
        showText.content = e.target.value;
        setShowText(showText);
        setListTodos([...showListTodos]);
    }

    const handleEditText = (todo: Todo, state?: string) => {
        let text = 
            state === 'DISCARD' ? {} : 
            Object.assign({
                [`${todo.id}`]: true,
                content: todo.content,
            });
        setShowText(text);
        setListTodos([...showListTodos]);
    }
    const setActiveState = (state: EnhanceTodoStatus) => {
        const showTodos = todos.filter((todo) => {
            switch (state) {
                case TodoStatus.ACTIVE:
                    return todo.status === TodoStatus.ACTIVE;
                case TodoStatus.COMPLETED:
                    return todo.status === TodoStatus.COMPLETED;
                default:
                    return true;
            }
        });
        setActive(state);
        setListTodos(showTodos);
    }

    const activeTodos = todos.reduce(function (accum, todo) {
        return isTodoCompleted(todo) ? accum : accum + 1;
    }, 0);
    
    return (
        <div className="ToDo__container">
            <div className="Todo__creation">
                <input
                    ref={inputRef}
                    className="Todo__input"
                    placeholder="What need to be done?"
                    onKeyDown={onCreateTodo}
                />
            </div>
            <div className="ToDo__list">
                {
                  showListTodos.length > 0 && showListTodos.map((todo, index) => {
                        return (
                            <div key={index} className="ToDo__item">
                                <input
                                    type="checkbox"
                                    checked={isTodoCompleted(todo)}
                                    onChange={(e) => onUpdateTodoStatus(e, todo.id)}
                                />
                                {!showText[todo.id] ?
                                    <span className="hover_edit_text" onDoubleClick={() => handleEditText(todo)}>{todo.content}</span>:
                                    <input
                                        value={showText['content'] ?? todo.content}
                                        autoFocus={showText[todo.id] ?? false}
                                        onBlur={() => handleEditText(todo, ActionUpadte.DISCARD)}
                                        className="input-none"
                                        onChange={onChangeText}
                                        onKeyDown={e => onUpdateText(e, todo)}
                                    />
                                }
                                <button
                                    className="Todo__delete"
                                    onClick={() => removeItem(todo.id)}
                                >
                                    X
                                </button>
                            </div>
                        );
                    })
                }
            </div>
            <div className="Todo__toolbar">
                {todos.length > 0 ?
                    <input
                        type="checkbox"
                        checked={activeTodos === 0}
                        onChange={onToggleAllTodo}
                    /> : <div/>
                }
                <div className="Todo__tabs">
                    <button 
                        className={`${"Action__btn btn-submit btn"} ${active==='ALL' && 'btn-active'}`} 
                        onClick={()=>setActiveState('ALL')}>
                        All
                    </button>
                    <button 
                        className={`${"Action__btn btn-success btn"} ${active===TodoStatus.ACTIVE && 'btn-active'}`} 
                        onClick={()=>setActiveState(TodoStatus.ACTIVE)}>
                        Active
                    </button>
                    <button 
                        className={`${"Action__btn btn-complete btn"} ${active===TodoStatus.COMPLETED && 'btn-active'}`} 
                        onClick={()=>setActiveState(TodoStatus.COMPLETED)}>
                        Completed
                    </button>
                </div>
                <button className="Action__btn btn-clear btn" onClick={onDeleteAllTodo}>
                    Clear all todos
                </button>
            </div>
        </div>
    );
};

export default ToDoPage;