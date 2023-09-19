import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './styles.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [createdMessage, setCreatedMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h2>log in to application</h2>
      </div>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>  
  )

  const createBlogForm = () => (
    <form onSubmit={handleNewblog}>
      <div>
        <h2>create new</h2>
      </div>
      <div>
        title:
          <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
          <input
          type="url"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>  
  )

  const handleNewblog = async (event) => {
    event.preventDefault()
    
    try {
      const newBlog = await blogService.create({
        title, author, url
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      setCreatedMessage('a new blog '+ title + " by " + author + " added")
      setTimeout(() => {
        setCreatedMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('error!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const showBlogs = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  
  const logout = () => {
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(false)
    ) 
    blogService.setToken(user.token)
    setUser(null)
  }

  const showError = (error) => (
    <div id = "errMsg">{error}</div>
  )

  const showCreated = (blog) => (
    <div id = "createdMsg">{blog}</div>
  )

  return (
    <div>
    <h2>blogs</h2>
    {errorMessage && showError(errorMessage)}
    {createdMessage && showCreated(createdMessage)}
    {!user && loginForm()}
    {user && <div>
      <p>{user.name} logged in <button onClick={logout}>log out</button></p>
          {createBlogForm()}
         {showBlogs()}
    </div>
    }
    </div>
  )
}

export default App