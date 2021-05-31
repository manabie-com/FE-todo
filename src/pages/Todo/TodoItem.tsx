import React from 'react';
import { Editable } from '../../components/Editable';
import XIcon from '../../components/icons/XIcon';
import { Todo, TodoStatus } from '../../models/todo';
import { formatDate, isTodoCompleted } from '../../utils';

export const TodoItem: React.FC<
	React.DetailedHTMLProps<
		React.LiHTMLAttributes<HTMLLIElement>,
		HTMLLIElement
	> & {
		todo: Todo;
		onUpdateTodoStatus: (
			e: React.ChangeEvent<HTMLInputElement>,
			todoId: string
		) => void;
		onUpdateTodoContent: (content: string, todoId: string) => void;
		onDeleteTodo: (todoId: string) => void;
	}
> = ({
	todo,
	onUpdateTodoStatus,
	onUpdateTodoContent,
	onDeleteTodo,
	...props
}) => {
	return (
		<li className="Todo__item" {...props}>
			<div>
				<div className="App__checkbox">
					<input
						type="checkbox"
						checked={isTodoCompleted(todo)}
						onChange={(e) => onUpdateTodoStatus(e, todo.id)}
					/>
				</div>
				<div className="Todo__content">
					<Editable
						textStyle={{
							textDecoration:
								todo.status === TodoStatus.COMPLETED ? 'line-through' : 'none',
						}}
						value={todo.content}
						onSave={(content) => onUpdateTodoContent(content, todo.id)}
					/>
					<p>{formatDate(new Date(todo.created_date))}</p>
				</div>
				<button
					type="button"
					className="App__btn__icon App__btn__icon--sm App__btn--danger"
					onClick={() => onDeleteTodo(todo.id)}
				>
					<XIcon />
				</button>
			</div>
		</li>
	);
};
