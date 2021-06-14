import React from "react"
import { render } from "@testing-library/react"
import TodoFilter from "."
import { TodoStatus } from "models/todo"
import fireEvent from "@testing-library/user-event"

test("should render the TodoFilter", () => {
  const { getByText } = render(
    <TodoFilter currentStatus={TodoStatus.ACTIVE} onChangeFilter={jest.fn} />,
  )
  expect(getByText("All")).toBeInTheDocument()
  expect(getByText("Active")).toBeInTheDocument()
  expect(getByText("Completed")).toBeInTheDocument()
})

test("should change filter status correctly", () => {
  let tempValue = ""
  const { getByText } = render(
    <TodoFilter
      currentStatus={TodoStatus.ACTIVE}
      onChangeFilter={(status) => {
        tempValue = status
      }}
    />,
  )
  fireEvent.click(getByText("All"))
  expect(tempValue).toEqual("ALL")
  fireEvent.click(getByText("Active"))
  expect(tempValue).toEqual(TodoStatus.ACTIVE)
  fireEvent.click(getByText("Completed"))
  expect(tempValue).toEqual(TodoStatus.COMPLETED)
})
