import React, { useRef, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import Header from '../../components/Header';
import CheckIcon from '../../components/icons/CheckIcon';
import LogoutIcon from '../../components/icons/LogoutIcon';
import { InputField } from '../../components/InputField';
import { routes } from '../../config/routes';
import { useTodos } from '../../context/todoContext';
import { TodoStatus } from '../../models/todo';
import Service from '../../service';
import {
	setTodos,
	createTodo,
	updateTodoStatus,
	updateTodoContent,
	toggleAllTodos,
	deleteAllTodos,
	deleteTodo,
} from '../../store/actions/todoActions';
import { isTodoCompleted } from '../../utils';
import useEffectOnMount from '../../utils/hooks/useEffectOnMount';
import { TodoItem } from './TodoItem';

const TodoPage = ({ history }: RouteComponentProps) => {
	const {
		state: { todos },
		dispatch,
	} = useTodos();
	const [showing, setShowing] = useState<TodoStatus>(TodoStatus.ALL);

	const inputRef = useRef<HTMLInputElement>(null);
	useEffectOnMount(() => {
		(async () => {
			const resp = await Service.getTodos();
			dispatch(setTodos(resp || []));
		})();
	});

	const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && inputRef.current?.value?.trim()) {
			try {
				const resp = await Service.createTodo(inputRef.current.value);

				dispatch(createTodo(resp));

				if (inputRef.current) {
					inputRef.current.value = '';
					inputRef.current.focus();
				}
				setShowing(TodoStatus.ALL);
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

	const onUpdateTodoContent = (content: string, todoId: string) => {
		dispatch(updateTodoContent(todoId, content));
	};

	const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(toggleAllTodos(e.target.checked));
	};

	const onDeleteAllTodo = () => {
		dispatch(deleteAllTodos());
	};

	const showTodos = todos
		.filter((todo) => {
			switch (showing) {
				case TodoStatus.ACTIVE:
					return todo.status === TodoStatus.ACTIVE;
				case TodoStatus.COMPLETED:
					return todo.status === TodoStatus.COMPLETED;
				default:
					return true;
			}
		})
		.sort((a, b) => b.created_date.localeCompare(a.created_date));

	const activeTodos = todos.reduce(function (accum, todo) {
		return isTodoCompleted(todo) ? accum : accum + 1;
	}, 0);

	const onChangeFilter: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
		setShowing(e.target.value as TodoStatus);
	};

	return (
		<>
			<Header
				title="Mana-do"
				actions={[
					<Link
						key="0"
						to={routes.logout}
						className="App__btn App__btn--sm"
						title="Logout"
					>
						<LogoutIcon />
					</Link>,
				]}
			/>
			<div className="Todo__container">
				<div className="Todo__creation">
					<InputField
						name="name"
						type="search"
						autoComplete="off"
						placeholder="What need to be done?"
						onKeyDown={onCreateTodo}
						ref={inputRef}
					/>
					<div className="Todo__toolbar">
						<div className="Todo__toggle">
							{todos.length > 0 && (
								<div className="App__checkbox">
									<input
										id="todo_toggle"
										type="checkbox"
										checked={activeTodos === 0}
										onChange={onToggleAllTodo}
									/>
									<label htmlFor="todo_toggle">Complete all</label>
								</div>
							)}
						</div>
						<div className="Todo__actions">
							<label htmlFor="todo_filter">Show:</label>
							<select
								id="todo_filter"
								className="App__select App__select--sm"
								onChange={onChangeFilter}
							>
								<option value={TodoStatus.ALL}>All</option>
								<option value={TodoStatus.ACTIVE}>Active</option>
								<option value={TodoStatus.COMPLETED}>Completed</option>
							</select>

							{todos.length > 0 && (
								<button
									className="App__btn App__btn--sm App__btn--danger"
									onClick={onDeleteAllTodo}
								>
									Clear all
								</button>
							)}
						</div>
					</div>
				</div>
				<ul className="Todo__list">
					{showTodos.map((t) => (
						<TodoItem
							key={t.id}
							todo={t}
							onUpdateTodoStatus={onUpdateTodoStatus}
							onUpdateTodoContent={onUpdateTodoContent}
							onDeleteTodo={() => dispatch(deleteTodo(t.id))}
						/>
					))}
					{showTodos.length <= 0 && todos.length > 0 && (
						<li className="Todo__empty">
							<p>No tasks for this state.</p>
						</li>
					)}
					{todos.length <= 0 && (
						<li className="Todo__empty">
							<CheckIcon height="3rem" width="3rem" />

							<p>No tasks for today.</p>
							<p>Enjoy your day</p>
						</li>
					)}
				</ul>
			</div>
		</>
	);
};

export default TodoPage;
