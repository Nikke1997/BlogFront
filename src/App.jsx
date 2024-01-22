import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import LogOut from './components/LogOut'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: ''
  })

  // Get all blogs
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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
  
  // Handle blog change
  const handleBlogChange = (event) => {
    setNewBlog({ ...newBlog, [event.target.name]: event.target.value })
  }


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

  // Add blog
  const addBlog = async (event) => {
    event.preventDefault()
    try {
    await blogService.create(newBlog).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>

      <div className='blogform'>
      <p>{user.name} Logged in</p>
      <BlogForm addBlog={addBlog} newBlog={newBlog} handleBlogChange={handleBlogChange} />
      </div>

      </div>
      }


   
    </div>
  )
}
export default App