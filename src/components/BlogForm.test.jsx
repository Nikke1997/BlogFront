import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("BlogForm calls event handler with right details", async () => {
  const user = userEvent.setup();
  const addBlog = jest.fn();

  render(<BlogForm addBlog={addBlog} />);

  const inputs = screen.getAllByRole("textbox");
  const sendButton = screen.getByText("Save");

  await userEvent.type(inputs[0], "Title");
  await userEvent.type(inputs[1], "Author");
  await userEvent.type(inputs[2], "Content");
  await userEvent.click(sendButton);

  expect(addBlog).toHaveBeenCalledTimes(1);
  expect(addBlog).toHaveBeenCalledWith({
    title: "Title",
    author: "Author",
    url: "Content",
  });
});
