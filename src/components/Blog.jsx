import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, user }) => {
  const [view, setView] = useState(false);
  const [updatedBlog, setUpdatedBlog] = useState(blog);

  console.log(updatedBlog);

  //Change view
  const viewChange = () => {
    setView(!view);
  };

  //Like blog
  const handleLike = async () => {
    try {
      const updated = await blogService.update(blog.id, {
        title: updatedBlog.title,
        author: updatedBlog.author,
        url: updatedBlog.url,
        likes: updatedBlog.likes + 1,
      });
      setUpdatedBlog(updated);
      console.log(updated);
    } catch (exception) {
      console.log("error");
    }
  };

  //Remove blog
  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(updatedBlog.id);
        setUpdatedBlog(null);
      } catch (exception) {
        console.log("error");
      }
    }
  };

  //Render blog view based on view state
  const blogView = () => {
    const username = blog.user.username;
    return (
      <div>
        {updatedBlog && (
          <section className="insideBlog">
            <p>
              {updatedBlog.title} by {updatedBlog.author}
            </p>
            {view && (
              <>
                <p>URL: {updatedBlog.url}</p>
                <p>
                  Likes: {updatedBlog.likes}{" "}
                  <button onClick={handleLike}>Like</button>
                </p>
                <p>{username}</p>
              </>
            )}
            <button onClick={viewChange}>{view ? "hide" : "view"}</button>
            {user.username === blog.user.username && (
              <button onClick={handleRemove}>Remove</button>
            )}
          </section>
        )}
      </div>
    );
  };

  return <div>{blogView()}</div>;
};

export default Blog;
