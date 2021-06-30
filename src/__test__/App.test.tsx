import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import App from "../App";

describe('App', () => {

  afterEach(() => (global.Storage.prototype.getItem as any).mockRestore());

  it('should redirect to signin page if go to auth page while unauthenticated', async () => {
    global.Storage.prototype.getItem = jest.fn(() => null);
    const Component = render(<MemoryRouter initialEntries={['/todo']}><App /></MemoryRouter>);

    const loginPage = Component.getByTestId('signin-page')

    expect(loginPage).toBeDefined();
  });

  it('should redirect to todo page if go to sign in page while authenticated', async () => {
    global.Storage.prototype.getItem = jest.fn().mockReturnValue('123').mockReturnValue('[]');
    const Component = render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);

    await waitFor(() => {
      const todoPage = Component.getByTestId('todo-page')

      expect(todoPage).toBeDefined();
    });
  });
});
