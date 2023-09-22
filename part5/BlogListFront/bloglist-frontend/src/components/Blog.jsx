import { useState } from 'react'
import blogs from '../services/blogs'

const Blog = ({ blog, deleteBlog, update, user }) => {
  const [visible, setVisible] = useState(false)
  const buttonLabel = visible ? 'hide' : 'view'
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = (event) => {
    setVisible(!visible)
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const increaseLikes = async () => {
    const response = await update(
      blog.id,
      {
        ...blog,
        likes: blog.likes + 1
      }
    )
    blog = response.data
  }

  const log = () => {
    console.log(user.id)
    console.log(blog.user)
  }

  const removeBlog = () => deleteBlog(blog)

  return (
    <div style={blogStyle}>
      <div>
        <p>{blog.title} - {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button></p>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{ blog.likes } <button id='like-button' onClick={increaseLikes}>like</button></p>
        <p>{blog.user[0].name}</p>

        {user.id===blog.user[0].id ? <button id='remove' onClick={removeBlog}>remove</button>: null}
      </div>
    </div>
  )
}

export default Blog