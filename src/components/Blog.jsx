import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, handleLike, updatedBlog, handleRemove }) => {
  const [view, setView] = useState(false)



  //Change view
  const viewChange = () => {
    setView(!view)
  }


  //Render blog view based on view state
  const blogView = () => {
    const username = blog.user.username
    return (
      <div className='blog'>
        {blog && (
          <section className="insideBlog">
            <p>
              {blog.title} by {blog.author}
            </p>
            {view && (
              <>
                <p>URL: {blog.url}</p>
                <p>
                  Likes: {blog.likes}{' '}
                  <button onClick={handleLike}>Like</button>
                </p>
                <p>{username}</p>
              </>
            )}
            <button onClick={viewChange}>{view ? 'hide' : 'view'}</button>
            {user.username === blog.user.username && (
              <button onClick={handleRemove}>Remove</button>
            )}
          </section>
        )}
      </div>
    )
  }

  return <div>{blogView()}</div>
}

export default Blog
