import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import { BookCard } from "./BookCard";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with/without book information", () => {
  act(() => {
    render(<BookCard />, container);
  });

  expect(container.textContent).toBe("n/aAuthor:n/aYear:n/a");
});

it("shows a book title, author, and year", () => {
  act(() => {
    render(
      <BookCard title="some title" year="1985" author={["Pirandello"]} />,
      container
    );
  });

  expect(container.textContent).toContain("some title");
  expect(container.textContent).toContain("Pirandello");
  expect(container.textContent).toContain("1985");
});
