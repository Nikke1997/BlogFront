import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import LogOut from './components/LogOut'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogAdded, setBlogAdded] = useState(false)
 




  // Add blog
  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
    await blogService.create(newBlog).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setBlogAdded(true)
      setMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 1000)
    })}
    catch (exception) {
      setErrorMessage('Error adding blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 1000)
    }
  }

  // Get all blogs
  useEffect(() => {
    const fetchData = async () => {
      const fetchedBlogs = await blogService.getAll()
      const sortedBlogs = fetchedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
    fetchData();
    setBlogAdded(false);
  }, [blogAdded])

  console.log('blogs', blogs)

  // Get user from local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  console.log('user', user)
  
  // Login
  const handleLogin = async (event) => {
    event.preventDefault()
   
    try {
      const user = await loginService.login({ 
        username, password 
        })

        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        )
        setUser(user)
        blogService.setToken(user.token)
        setUsername('')
        setPassword('')
        setMessage('Logged in successfully')
        setTimeout(() => {
          setMessage(null)
        }, 1000)
    }
    catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 1000)
  }
  }

  
  

  
const blogFormRef = useRef();



  return (
    <div>
      <div className='notification'>
      <Notification errorMessage={errorMessage} message={message}/>
      </div>
     {!user && 
     <LoginForm 
     handleLogin={handleLogin} 
     username={username} 
     password={password}
     handleUserNameChange={({target}) => setUsername(target.value)} 
     handlePasswordChange={({target}) => setPassword(target.value)} 
     />}
      {user && 
      <div>

        <div className='bloglist'>
        <LogOut />
        <h2>Blogs</h2>
        <section className='bareBlogs'>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user}/>
      )}
      </section>
      </div>

      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
      <div className='blogform'>
      <p>Logged in as {user.username} </p>
      <BlogForm addBlog={addBlog}/>
      </div>
      </Togglable>

      </div>
      }


   
    </div>
  )
}
export default App