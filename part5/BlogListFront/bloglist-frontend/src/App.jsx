import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './styles.css'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [update, setUpdate] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [createdMessage, setCreatedMessage] = useState(null)
  const createBlogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [update])

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

  const handleNewblog = async (blogObject) => {
    createBlogRef.current.toggleVisibility()

    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setCreatedMessage('a new blog '+ newBlog.title + ' by ' + newBlog.author + ' added')
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

  const deleteBlog = async (BlogToDelete) => {
    try {
      if (window.confirm(`Delete ${BlogToDelete.title} ?`)) {
        blogService
          .deleteBlog(BlogToDelete.id)
        setCreatedMessage(
          `Blog ${BlogToDelete.title} was successfully deleted`
        )
        setBlogs(blogs.filter(blog => blog.id !== BlogToDelete.id))
        setTimeout(() => {
          setCreatedMessage(null)
        }, 5000)
      }
    } catch(exception) {
      setErrorMessage(
        `Cannot delete blog ${BlogToDelete.title}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const showBlogs = () => {
    return(
      <div>
        {blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog =>
          <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} update={blogService.update} user={user} setUpdate={setUpdate}/>
        )}
      </div>
    )
}

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

  const createNewBlogs = () => (
      <div>
        <Togglable buttonLabel='create blog' buttonid='create' ref={createBlogRef}>
          <CreateBlogForm createNewBlog = {handleNewblog} setUpdate={setUpdate} />
        </Togglable>
      </div>
    )

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage && showError(errorMessage)}
      {createdMessage && showCreated(createdMessage)}
      {!user && <LoginForm handleLogin={handleLogin} setPassword={setPassword}
        setUsername={setUsername} username={username} password={password}/>}

      {user && <div>
        <p>{user.name} logged in <button id='logout' onClick={logout}>log out</button> </p>
      </div>
      }
      {createNewBlogs()}
      {user && showBlogs()}
    </div>
  )
}

export default App