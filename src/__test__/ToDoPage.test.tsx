import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import userEvent, { specialChars } from '@testing-library/user-event'
import ToDoPage from "../pages/ToDoPage";

const mockRouter: any = {
	history: { push: jest.fn() },
}

describe('Todo page', () => {
	beforeEach(() => {
		global.Storage.prototype.setItem = jest.fn(() => null)
	});

	afterEach(() => (global.Storage.prototype.setItem as any).mockRestore());

	describe('Todo page: first load', () => {
		const mockItemsStorage = '[{"content":"a","created_date":"2021-06-28T11:50:28.318Z","status":"ACTIVE","id":"40fQF1Mz5","user_id":"1"},{"content":"b","created_date":"2021-06-28T11:50:41.242Z","status":"ACTIVE","id":"UTmOG7Mo4","user_id":"2"}]';

		beforeEach(() => {
			global.Storage.prototype.getItem = jest.fn(() => mockItemsStorage)
		});

		afterEach(() => (global.Storage.prototype.getItem as any).mockRestore());

		it('should get data from local storage on first load', async () => {
			const Page = render(<ToDoPage {...mockRouter} />);

			await waitFor(async () => {
				const item1 = await Page.getAllByText('a');

				expect(item1).toHaveLength(1);

				const item2 = await Page.getAllByText('b');

				expect(item2).toHaveLength(1);
			});
		});
	});


	describe('Todo page: handle actions', () => {
		const addItemAction = async (content: string) => {
			const addItemInput = await screen.getByTestId('add-item-input');

			return waitFor(async () => {
				await userEvent.type(addItemInput, content);
				await userEvent.keyboard(specialChars.enter);
			});
		};

		it('should add item correctly (should not duplicate item) + save item', async () => {
			const Page = render(<ToDoPage {...mockRouter} />);

			await addItemAction('a');

			const item1 = await Page.getAllByText('a');

			expect(item1).toHaveLength(1);

			await addItemAction('b');

			const item2 = await Page.getAllByText('b');

			expect(item2).toHaveLength(1);

			expect(global.Storage.prototype.setItem).toHaveBeenCalledTimes(2)
		});
	});
});
