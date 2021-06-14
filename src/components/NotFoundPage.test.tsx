import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import App from '../App';

test('valid page title + link', () => {
  const history = createBrowserHistory();
  history.replace(`/page-${new Date().getTime()}`);

  const {getByText} = render(
    <Router history={history}>
      <App/>
    </Router>,
  );

  const titleElement = getByText(/page not found/i);
  expect(titleElement).toBeInTheDocument();

  const linkElement = getByText(/return to homepage/i);
  expect(linkElement).toBeInTheDocument();
});
