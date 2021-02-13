import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders ftgo title", () => {
  render(<App />);
  const titleElement = screen.getByText(/Food to Go/i);
  expect(titleElement).toBeInTheDocument();
});
