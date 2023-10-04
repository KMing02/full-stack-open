import { useState } from 'react'
import blogs from '../services/blogs'

const Blog = ({ blog, deleteBlog, update, user, setUpdate }) => {
  const [visible, setVisible] = useState(false)
  const buttonLabel = visible ? 'hide' : 'view'
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = (event) => {
    setUpdate(Math.floor(Math.random() * 100))
    setVisible(!visible)
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const increaseLikes = async (event) => {
    event.preventDefault()
    const response = await update(
      blog.id,
      {
        ...blog,
        likes: blog.likes + 1
      }
    )
    blog = response.data
    setUpdate(Math.floor(Math.random() * 100))
  }

  const removeBlog = () => deleteBlog(blog)

  return (
    <div id='blog' style={blogStyle}>
      <div className='title-author'>
        <p>{blog.title} - {blog.author} <button id='view' onClick={toggleVisibility}>{buttonLabel}</button></p>
      </div>
      <div style={showWhenVisible}>
        <p className='url'>{blog.url}</p>
        <p className='like'>{ blog.likes } <button id='like-button' onClick={increaseLikes}>like</button></p>
        <p>{blog.user[0].name}</p>
        {user.id===blog.user[0].id ? <button id='remove' onClick={removeBlog}>remove</button>: null}
      </div>
    </div>
  )
}

export default Blog