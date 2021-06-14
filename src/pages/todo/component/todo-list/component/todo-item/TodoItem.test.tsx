import React from "react"
import { cleanup, render } from "@testing-library/react"
import fireEvent from "@testing-library/user-event"
import TodoItem from "."
import shortid from "shortid"
import { TodoStatus } from "../../../../../../models/todo"

const todo = {
  id: shortid(),
  user_id: "firstUser",
  content: "item",
  status: TodoStatus.ACTIVE,
  created_date: new Date().toISOString(),
}

afterEach(cleanup)

test("should render the TodoItem", () => {
  const { getByText } = render(
    <TodoItem
      todo={todo}
      onDelete={jest.fn}
      onUpdateTodo={jest.fn}
      onMarkDone={jest.fn}
    />,
  )
  expect(getByText(todo.content)).toBeInTheDocument()
})

test("should mark done when click", () => {
  let tempValue = false
  const { getByText } = render(
    <TodoItem
      todo={todo}
      onDelete={jest.fn}
      onUpdateTodo={jest.fn}
      onMarkDone={(isDone) => {
        tempValue = isDone
      }}
    />,
  )
  fireEvent.click(getByText(todo.content))
  expect(tempValue).toEqual(true)
})

test("should delete when click delete button", () => {
  let tempValue = false
  const { getByText } = render(
    <TodoItem
      todo={todo}
      onDelete={jest.fn}
      onUpdateTodo={jest.fn}
      onMarkDone={(isDone) => {
        tempValue = isDone
      }}
    />,
  )
  fireEvent.click(getByText(todo.content))
  expect(tempValue).toEqual(true)
})

test("should delete correctly", () => {
  let tempValue = ""
  const { getByTestId } = render(
    <TodoItem
      todo={todo}
      onDelete={(todoId) => {
        tempValue = todoId
      }}
      onUpdateTodo={jest.fn}
      onMarkDone={jest.fn}
    />,
  )
  fireEvent.click(getByTestId("deleteBtn"))
  expect(tempValue).toEqual(todo.id)
})

test("should double click edit correctly", () => {
  const { getByText, queryByTestId } = render(
    <TodoItem
      todo={todo}
      onDelete={jest.fn}
      onUpdateTodo={jest.fn}
      onMarkDone={jest.fn}
    />,
  )
  expect(queryByTestId("updateInput")).toBeNull()
  fireEvent.dblClick(getByText(todo.content))
  expect(queryByTestId("updateInput")).toBeInTheDocument()
  expect(queryByTestId("updateInput")).toHaveProperty("focus")
  queryByTestId("updateInput").blur()
  expect(queryByTestId("updateInput")).toBeNull()
})
