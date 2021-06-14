import React from "react"
import { render } from "@testing-library/react"
import TodoInput from "."

test("should render the TodoFilter", () => {
  const { queryByTestId } = render(<TodoInput />)
  expect(queryByTestId("todoInput")).toBeInTheDocument()
})
