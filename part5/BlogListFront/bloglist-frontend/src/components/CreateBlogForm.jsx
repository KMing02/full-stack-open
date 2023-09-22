import { useState } from "react"

const createBlogForm = ({createNewBlog, nameofuser}) => {
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
}

export default createBlogForm