
import React from 'react';
import reducer, {initialState, AppState} from '../store/reducer'

const StateContext = React.createContext(initialState);
const DispatchContext = React.createContext({});

function StoreProvider ({children}: any) {
  let todos: any = [];
  if(typeof window !== undefined) {
    todos = localStorage.getItem('todos');
    todos = todos ? JSON.parse(todos): [];
  }
  var [state, dispatch]: [AppState, any] = React.useReducer(reducer, {
      todos,
  });
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>);
}

function useStoreState() {

  var context = React.useContext(StateContext);
  if (context === undefined) {
    throw new Error("useState must be used within a Provider");
  }
  return context;
}

function useDispatch() {
  var context = React.useContext(DispatchContext);
  if (context === undefined) {
    throw new Error("useDispatch must be used within a Provider");
  }
  return context;
}

export {
    StoreProvider, 
    useStoreState, 
    useDispatch, 
    updateStore,
};

function updateStore(dispatch: any, action: any) {
    dispatch(action);
}
