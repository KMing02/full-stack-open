const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
  
blogsRouter.post('/api/blogs', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if ((body.title === undefined) || (body.url === undefined)) {
    return response.status(400).json({error: 'title or url undefined'})
  }
  
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    user: user.id,
    likes: body.likes
  })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
  })

blogsRouter.delete('/api/blogs/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (!blog) {
    return response.status(404).end('blog with id given does not exist')
  }

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  } else {
    return response.status(401).toString('wrong token given')
  }
})

blogsRouter.put('/api/blogs/:id', async(request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(updatedBlog)
})

module.exports = blogsRouter