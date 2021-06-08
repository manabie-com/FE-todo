import reducer from "./reducer";
import {
  DELETE_TODO,
  DELETE_ALL_TODOS,
  UPDATE_TODO_CONTENT,
  UPDATE_TODO_STATUS,
  TOGGLE_ALL_TODOS,
  CREATE_TODO,
} from "./actions";
import { TodoStatus } from "../models/todo";

// DeleteTodo Test Case
test("#1. deleteTodo normal case", () => {
  const initialState = {
    todos: [
      {
        id: "sl2_uKp86",
        user_id: "firstUser",
        content: "Todo #1",
        status: TodoStatus.ACTIVE,
        created_date: "2021-06-08T03: 09: 50.184Z",
      },
      {
        id: "iSEm3j3Cbf",
        user_id: "firstUser",
        content: "Todo #2",
        status: TodoStatus.ACTIVE,
        created_date: "2021-06-08T03: 09: 50.663Z",
      },
    ],
  };

  const action = {
    type: DELETE_TODO,
    payload: "sl2_uKp86",
  };

  const modifiedState = reducer(initialState, action);
  expect(modifiedState).toEqual({
    todos: [
      {
        id: "iSEm3j3Cbf",
        user_id: "firstUser",
        content: "Todo #2",
        status: TodoStatus.ACTIVE,
        created_date: "2021-06-08T03: 09: 50.663Z",
      },
    ],
  });
});

test("#2. deleteTodo normal case (with only one item at the beginning)", () => {
  const initialState = {
    todos: [
      {
        id: "sl2_uKp86",
        user_id: "firstUser",
        content: "Todo #1",
        status: TodoStatus.ACTIVE,
        created_date: "2021-06-08T03: 09: 50.184Z",
      },
    ],
  };

  const action = {
    type: DELETE_TODO,
    payload: "sl2_uKp86",
  };

  const modifiedState = reducer(initialState, action);
  expect(modifiedState).toEqual({
    todos: [],
  });
});

test("#3. deleteTodo abnormal case (the given id doesn't exist)", () => {
  const initialState = {
    todos: [
      {
        id: "sl2_uKp86",
        user_id: "firstUser",
        content: "Todo #1",
        status: TodoStatus.ACTIVE,
        created_date: "2021-06-08T03: 09: 50.184Z",
      },
    ],
  };

  const action = {
    type: DELETE_TODO,
    payload: "iSEm3j3Cbf",
  };

  const modifiedState = reducer(initialState, action);
  expect(modifiedState).toEqual({
    todos: [
      {
        id: "sl2_uKp86",
        user_id: "firstUser",
        content: "Todo #1",
        status: TodoStatus.ACTIVE,
        created_date: "2021-06-08T03: 09: 50.184Z",
      },
    ],
  });
});

test("#4. deleteTodo abnormal case (the todo list is empty from the beginning)", () => {
  const initialState = {
    todos: [],
  };

  const action = {
    type: DELETE_TODO,
    payload: "iSEm3j3Cbf",
  };

  const modifiedState = reducer(initialState, action);
  expect(modifiedState).toEqual({
    todos: [],
  });
});

// ClearAllTodos Test Case
test("#5. deleteAllTodos normal case", () => {
  const initialState = {
    todos: [
      {
        id: "sl2_uKp86",
        user_id: "firstUser",
        content: "Todo #1",
        status: TodoStatus.ACTIVE,
        created_date: "2021-06-08T03: 09: 50.184Z",
      },
      {
        id: "iSEm3j3Cbf",
        user_id: "firstUser",
        content: "Todo #2",
        status: TodoStatus.COMPLETED,
        created_date: "2021-06-08T03: 09: 50.663Z",
      },
    ],
  };

  const action = { type: DELETE_ALL_TODOS };

  const modifiedState = reducer(initialState, action);
  expect(modifiedState).toEqual({
    todos: [],
  });
});

test("#6. deleteAllTodos normal case (empty todo list at the beginning)", () => {
  const initialState = {
    todos: [],
  };

  const action = { type: DELETE_ALL_TODOS };

  const modifiedState = reducer(initialState, action);
  expect(modifiedState).toEqual({
    todos: [],
  });
});

// UpdateTodoContent Test Case
test("#7. updateTodoContent normal case", () => {
  const initialState = {
    todos: [
      {
        id: "sl2_uKp86",
        user_id: "firstUser",
        content: "Todo #1",
        status: TodoStatus.ACTIVE,
        created_date: "2021-06-08T03: 09: 50.184Z",
      },
      {
        id: "iSEm3j3Cbf",
        user_id: "firstUser",
        content: "Todo #2",
        status: TodoStatus.COMPLETED,
        created_date: "2021-06-08T03: 09: 50.663Z",
      },
    ],
  };

  const action = {
    type: UPDATE_TODO_CONTENT,
    payload: {
      todoId: "iSEm3j3Cbf",
      value: "New Content",
    },
  };

  const modifiedState = reducer(initialState, action);
  expect(modifiedState).toEqual({
    todos: [
      {
        id: "sl2_uKp86",
        user_id: "firstUser",
        content: "Todo #1",
        status: TodoStatus.ACTIVE,
        created_date: "2021-06-08T03: 09: 50.184Z",
      },
      {
        id: "iSEm3j3Cbf",
        user_id: "firstUser",
        content: "New Content",
        status: TodoStatus.COMPLETED,
        created_date: "2021-06-08T03: 09: 50.663Z",
      },
    ],
  });
});

test("#8. updateTodoContent abnormal case (update id doesn't exist)", () => {
  const initialState = {
    todos: [
      {
        id: "sl2_uKp86",
        user_id: "firstUser",
        content: "Todo #1",
        status: TodoStatus.ACTIVE,
        created_date: "2021-06-08T03: 09: 50.184Z",
      },
      {
        id: "iSEm3j3Cbf",
        user_id: "firstUser",
        content: "Todo #2",
        status: TodoStatus.COMPLETED,
        created_date: "2021-06-08T03: 09: 50.663Z",
      },
    ],
  };

  const action = {
    type: UPDATE_TODO_CONTENT,
    payload: {
      todoId: "tHiSIdDoEsNtExIsT",
      value: "New Content",
    },
  };

  const modifiedState = reducer(initialState, action);
  expect(modifiedState).toEqual({
    todos: [
      {
        id: "sl2_uKp86",
        user_id: "firstUser",
        content: "Todo #1",
        status: TodoStatus.ACTIVE,
        created_date: "2021-06-08T03: 09: 50.184Z",
      },
      {
        id: "iSEm3j3Cbf",
        user_id: "firstUser",
        content: "Todo #2",
        status: TodoStatus.COMPLETED,
        created_date: "2021-06-08T03: 09: 50.663Z",
      },
    ],
  });
});

// UpdateTodoStatus Test Case
test("#9. updateTodoStatus normal case", () => {
  const initialState = {
    todos: [
      {
        id: "sl2_uKp86",
        user_id: "firstUser",
        content: "Todo #1",
        status: TodoStatus.ACTIVE,
        created_date: "2021-06-08T03: 09: 50.184Z",
      },
      {
        id: "iSEm3j3Cbf",
        user_id: "firstUser",
        content: "Todo #2",
        status: TodoStatus.COMPLETED,
        created_date: "2021-06-08T03: 09: 50.663Z",
      },
    ],
  };

  const action = {
    type: UPDATE_TODO_STATUS,
    payload: {
      todoId: "sl2_uKp86",
      checked: true,
    },
  };

  const modifiedState = reducer(initialState, action);
  expect(modifiedState).toEqual({
    todos: [
      {
        id: "sl2_uKp86",
        user_id: "firstUser",
        content: "Todo #1",
        status: TodoStatus.COMPLETED,
        created_date: "2021-06-08T03: 09: 50.184Z",
      },
      {
        id: "iSEm3j3Cbf",
        user_id: "firstUser",
        content: "Todo #2",
        status: TodoStatus.COMPLETED,
        created_date: "2021-06-08T03: 09: 50.663Z",
      },
    ],
  });
});

test("#10. updateTodoStatus abnormal case (update id doesn't exist)", () => {
  const initialState = {
    todos: [
      {
        id: "sl2_uKp86",
        user_id: "firstUser",
        content: "Todo #1",
        status: TodoStatus.ACTIVE,
        created_date: "2021-06-08T03: 09: 50.184Z",
      },
      {
        id: "iSEm3j3Cbf",
        user_id: "firstUser",
        content: "Todo #2",
        status: TodoStatus.COMPLETED,
        created_date: "2021-06-08T03: 09: 50.663Z",
      },
    ],
  };

  const action = {
    type: UPDATE_TODO_STATUS,
    payload: {
      todoId: "tHiSIdDoEsNtExIsT",
      checked: true,
    },
  };

  const modifiedState = reducer(initialState, action);
  expect(modifiedState).toEqual({
    todos: [
      {
        id: "sl2_uKp86",
        user_id: "firstUser",
        content: "Todo #1",
        status: TodoStatus.ACTIVE,
        created_date: "2021-06-08T03: 09: 50.184Z",
      },
      {
        id: "iSEm3j3Cbf",
        user_id: "firstUser",
        content: "Todo #2",
        status: TodoStatus.COMPLETED,
        created_date: "2021-06-08T03: 09: 50.663Z",
      },
    ],
  });
});

// ToogleAllTodos Test Case
test("#11. toogleAllTodos normal case (toogle on)", () => {
  const initialState = {
    todos: [
      {
        id: "sl2_uKp86",
        user_id: "firstUser",
        content: "Todo #1",
        status: TodoStatus.ACTIVE,
        created_date: "2021-06-08T03: 09: 50.184Z",
      },
      {
        id: "iSEm3j3Cbf",
        user_id: "firstUser",
        content: "Todo #2",
        status: TodoStatus.COMPLETED,
        created_date: "2021-06-08T03: 09: 50.663Z",
      },
    ],
  };

  const action = {
    type: TOGGLE_ALL_TODOS,
    payload: true,
  };

  const modifiedState = reducer(initialState, action);
  expect(modifiedState).toEqual({
    todos: [
      {
        id: "sl2_uKp86",
        user_id: "firstUser",
        content: "Todo #1",
        status: TodoStatus.COMPLETED,
        created_date: "2021-06-08T03: 09: 50.184Z",
      },
      {
        id: "iSEm3j3Cbf",
        user_id: "firstUser",
        content: "Todo #2",
        status: TodoStatus.COMPLETED,
        created_date: "2021-06-08T03: 09: 50.663Z",
      },
    ],
  });
});

test("#12. toogleAllTodos normal case (toogle off)", () => {
  const initialState = {
    todos: [
      {
        id: "sl2_uKp86",
        user_id: "firstUser",
        content: "Todo #1",
        status: TodoStatus.ACTIVE,
        created_date: "2021-06-08T03: 09: 50.184Z",
      },
      {
        id: "iSEm3j3Cbf",
        user_id: "firstUser",
        content: "Todo #2",
        status: TodoStatus.COMPLETED,
        created_date: "2021-06-08T03: 09: 50.663Z",
      },
    ],
  };

  const action = {
    type: TOGGLE_ALL_TODOS,
    payload: false,
  };

  const modifiedState = reducer(initialState, action);
  expect(modifiedState).toEqual({
    todos: [
      {
        id: "sl2_uKp86",
        user_id: "firstUser",
        content: "Todo #1",
        status: TodoStatus.ACTIVE,
        created_date: "2021-06-08T03: 09: 50.184Z",
      },
      {
        id: "iSEm3j3Cbf",
        user_id: "firstUser",
        content: "Todo #2",
        status: TodoStatus.ACTIVE,
        created_date: "2021-06-08T03: 09: 50.663Z",
      },
    ],
  });
});

// CreateTodo Test Case
test("#13. createTodo normal case", () => {
  const initialState = {
    todos: [
      {
        id: "sl2_uKp86",
        user_id: "firstUser",
        content: "Todo #1",
        status: TodoStatus.ACTIVE,
        created_date: "2021-06-08T03: 09: 50.184Z",
      },
      {
        id: "iSEm3j3Cbf",
        user_id: "firstUser",
        content: "Todo #2",
        status: TodoStatus.COMPLETED,
        created_date: "2021-06-08T03: 09: 50.663Z",
      },
    ],
  };

  const action = {
    type: CREATE_TODO,
    payload: {
      id: "ab8_roiaOP",
      user_id: "firstUser",
      content: "Todo #3",
      status: TodoStatus.ACTIVE,
      created_date: "2021-07-08T03: 09: 50.184Z",
    },
  };

  const modifiedState = reducer(initialState, action);
  expect(modifiedState).toEqual({
    todos: [
      {
        id: "sl2_uKp86",
        user_id: "firstUser",
        content: "Todo #1",
        status: TodoStatus.ACTIVE,
        created_date: "2021-06-08T03: 09: 50.184Z",
      },
      {
        id: "iSEm3j3Cbf",
        user_id: "firstUser",
        content: "Todo #2",
        status: TodoStatus.COMPLETED,
        created_date: "2021-06-08T03: 09: 50.663Z",
      },
      {
        id: "ab8_roiaOP",
        user_id: "firstUser",
        content: "Todo #3",
        status: TodoStatus.ACTIVE,
        created_date: "2021-07-08T03: 09: 50.184Z",
      },
    ],
  });
});
