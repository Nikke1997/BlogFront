import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

describe("testing", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Test Author",
    url: "www.test.com",
    likes: 0,
    user: {
      username: "test",
      name: "test",
    },
  }
  const testUser = {
    username: "test",
    name: "test",
  }

  test("renders content", () => {
    render(<Blog blog={blog} user={testUser} />);
    screen.debug();
    //Look if the component contains the title and author but not the url or number of likes
    expect(
      screen.getByText(
        "Component testing is done with react-testing-library by Test Author"
      )
    ).toBeInTheDocument();

    expect(screen.queryByText("www.test.com")).not.toBeInTheDocument();
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  test("clicking the button shows url and number of likes", async () => {
    render(
    <Blog blog={blog} user={testUser} />
    );

    screen.debug();


    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);
    screen.debug();

    expect(screen.getByText("URL: www.test.com")).toBeInTheDocument();
    expect(screen.getByText("Likes: 0")).toBeInTheDocument();
  });

  test("clicking the like button twice calls event handler twice", async () => {
    const mockHandler = jest.fn();
    render(
      <Blog blog={blog} user={testUser} handleLike={mockHandler} />
    );
    
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const likeButton = screen.getByText("Like");
    await user.click(likeButton);
    await user.click(likeButton);

    screen.debug();

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
