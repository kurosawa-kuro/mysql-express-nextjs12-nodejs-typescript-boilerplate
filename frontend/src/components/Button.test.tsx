// components/Button.test.tsx

/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Button from "./Button";

test("it renders a button", () => {
  render(<Button children={undefined} />);
  expect(screen.getByRole("button")).toBeInTheDocument();
});
