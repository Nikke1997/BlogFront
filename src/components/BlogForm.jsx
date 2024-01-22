const BlogForm = ({ addBlog, newBlog, handleBlogChange }) => (
    <div>
    <form onSubmit={addBlog}>
      <h2>Create new</h2>
      <div>
      <label htmlFor="title">Title: </label>
      <input 
      type="text"
      name="title"
      id='title'
      value={newBlog.title}
      onChange={handleBlogChange}
      />
      </div>
      <br/>
      <div>
      <label htmlFor="Author">Author: </label>
      <input 
      type="text"
      name="author"
      id='Author'
      value={newBlog.author}
      onChange={handleBlogChange}
      />
      </div>
      <br/>
      <div>
      <label htmlFor="url">URL: </label>
      <input 
      type="text"
      name="url"
      id='url'
      value={newBlog.url}
      onChange={handleBlogChange}
      />
      </div>
      <br/>
      <div>
      <label htmlFor="likes">Likes: </label>
      <input 
      type="number"
      name="likes"
      id='likes'
      value={newBlog.likes}
      onChange={handleBlogChange}
      />
      </div>
      <button type="submit">Save</button>
    </form>
    </div>
  )

  export default BlogForm