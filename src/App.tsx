import React, { useReducer } from 'react';
import routes from './routes';
import reducer, { initialState, TodoContext } from '@store/reducer';
import './App.css';

function App() {
  const [{ token, todos }, dispatch] = useReducer(reducer, initialState);

  return (
    <TodoContext.Provider value={[{ token, todos }, dispatch]}>
      {routes(token)}
    </TodoContext.Provider>
  );
}

export default App;
