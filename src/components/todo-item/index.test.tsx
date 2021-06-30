import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import userEvent, { specialChars } from '@testing-library/user-event'
import ToDoItem from "./index";
import {Todo, TodoStatus} from "../../models/todo";

describe('Todo item', () => {
	const mockItem: Todo = {
		content: 'a',
		id: '1',
		status: TodoStatus.ACTIVE,
		editable: false,
		created_date: '',
		user_id: '1',
	};

	const mockOnChangeItem = jest.fn();
	const mockOnDeleteItem = jest.fn();

	it('should render default item successfully', async () => {
		const Component = render(<ToDoItem onChangeItem={mockOnChangeItem} onDeleteItem={mockOnDeleteItem} item={mockItem} />);

		const statusCheckbox = await Component.getByRole('status-checkbox-1');
		const contentInput = await Component.getByRole('content-input-1');
		const contentText = await Component.getByRole('content-text-1');
		const btnDelete = await Component.getByRole('delete-btn-1');

		expect(statusCheckbox).toBeDefined();
		expect(contentInput).toBeDefined();
		expect(contentText).toHaveTextContent('a');
		expect(btnDelete).toBeDefined();
	});

	it('should call change edit mode', async () => {
		const Component = render(<ToDoItem onChangeItem={mockOnChangeItem} onDeleteItem={mockOnDeleteItem} item={mockItem} />);

		const item = await Component.getByRole('item-1');
		const contentInput = await Component.getByRole('content-input-1');

		expect(contentInput).toHaveClass('ToDo__item__content__change hide', {exact: true});

		userEvent.dblClick(item);

		expect(mockOnChangeItem).toHaveBeenCalledWith({editable: true, id: '1'});
	});

	it('should change content correctly', async () => {
		const Component = render(<ToDoItem onChangeItem={mockOnChangeItem} onDeleteItem={mockOnDeleteItem} item={{ ...mockItem, editable: true }} />);

		const contentInput = await Component.getByRole('content-input-1');
		const statusCheckbox = await Component.getByRole('status-checkbox-1');
		const contentText = await Component.getByRole('content-text-1');

		expect(contentText).toHaveClass('hide', {exact: true});
		expect(statusCheckbox).toHaveClass('hide', {exact: true});
		expect(contentInput).toHaveClass('ToDo__item__content__change', {exact: true});

		await userEvent.type(contentInput, 'abc');
		await userEvent.keyboard(specialChars.enter);

		expect(mockOnChangeItem).toHaveBeenCalledWith({content: 'abc', id: '1', editable: false});
	});
});
