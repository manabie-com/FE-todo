import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'pages';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  //remove strict mode 'cuz the reducer will dispatch twice in this mode
  //issues link https://github.com/facebook/react/issues/16295
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
