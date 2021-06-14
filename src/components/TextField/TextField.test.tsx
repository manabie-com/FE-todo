import React from "react"
import { render } from "@testing-library/react"
import TextField from "."

test("should render the TextField", () => {
  const { getByText } = render(<TextField label={"label"} />)
  expect(getByText("label")).toBeInTheDocument()
})
