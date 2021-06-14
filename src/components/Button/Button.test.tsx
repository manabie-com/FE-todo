import React from "react"
import { render } from "@testing-library/react"
import Button from "."

test("should render the Button", () => {
  const { getByText } = render(<Button>Signin</Button>)
  expect(getByText("Signin")).toBeInTheDocument()
})
