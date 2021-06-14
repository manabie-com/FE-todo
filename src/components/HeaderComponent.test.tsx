import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import HeaderComponent from './HeaderComponent';
import {createMemoryHistory} from 'history';

test('has avatar', () => {
  const {getByAltText} = render(<HeaderComponent/>);
  const element = getByAltText(/hb/i);
  expect(element).toBeInTheDocument();
});

test('has welcome text', () => {
  const {getByText} = render(<HeaderComponent/>);
  const element = getByText(/welcome/i);
  expect(element).toBeInTheDocument();
});

test('click on logout button', async () => {
  window.confirm = jest.fn(() => true);
  const history = createMemoryHistory();
  const {getByText} = render(<HeaderComponent history={history}/>);
  const buttonElement = getByText(/sign out/i);

  expect(buttonElement).toBeInTheDocument();

  await fireEvent.click(buttonElement);

  expect(window.confirm).toBeCalled();
});
