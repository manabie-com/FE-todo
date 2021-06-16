import React from 'react';

const SignIn = React.lazy(() => import('../components/SignInPage'));
const ToDo = React.lazy(() => import('../components/ToDoPage'));

const routes = [
  { path: '/', exact: true, name: 'signin', component: SignIn },
  { path: '/todo', exact: true, name: 'todo', component: ToDo },
];

export default routes;
