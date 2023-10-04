import { useState } from 'react'

const CreateBlogForm = ({ createNewBlog, nameofuser, setUpdate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createNewBlog({
      title: title,
      author: author,
      url: url,
      likes: 0,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form onSubmit={addBlog}>
      <div>
        <h2>create new</h2>
      </div>
      <div>
            title:
        <input
          type="text"
          value={title}
          id="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
            author:
        <input
          type="text"
          value={author}
          id="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
            url:
        <input
          type="url"
          value={url}
          id="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id='createblog-button' type="submit">create</button>
    </form>
  )
}

export default CreateBlogForm