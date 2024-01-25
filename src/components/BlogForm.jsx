import { useState } from 'react'


const BlogForm = ({ addBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })




  // Handle blog change
  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
  }


  const createBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    })
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }



  return (
    <div>
      <form onSubmit={createBlog}>
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
        <button type="submit" id='save'>Save</button>
      </form>
    </div>
  )
}

export default BlogForm