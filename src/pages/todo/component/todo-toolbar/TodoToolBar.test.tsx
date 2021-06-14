import React from "react"
import { render } from "@testing-library/react"
import TodoInput from "."
import TodoToolbar from "."
import fireEvent from "@testing-library/user-event"

test("should render the TodoFilter", () => {
  const { getByText } = render(
    <TodoToolbar
      isChecked={false}
      onClear={jest.fn()}
      onChange={jest.fn()}
      isExistList={true}
      showCheckAll={true}
    />,
  )
  expect(getByText("Mark all done")).toBeInTheDocument()
  expect(getByText("Clear all todos")).toBeInTheDocument()
})

test("should TodoToolbar event change correctly", () => {
  let tempValue = false
  const { getByText } = render(
    <TodoToolbar
      isChecked={false}
      onClear={() => {
        tempValue = true
      }}
      onChange={(isCheck) => {
        tempValue = isCheck
      }}
      isExistList={true}
      showCheckAll={true}
    />,
  )
  fireEvent.click(getByText("Mark all done"))
  expect(tempValue).toEqual(true)
  tempValue = false
  fireEvent.click(getByText("Clear all todos"))
  expect(tempValue).toEqual(true)
})
