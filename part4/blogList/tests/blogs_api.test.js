const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

initialBlogs = [
    {
        title: 'test blog 101',
        author: 'somebody',
        url: 'www.test.com',
        likes: '15'
    },
    {
        title: 'test blog 102',
        author: 'nobody',
        url: 'www.test1.com',
        likes: '100'
    }
]

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("aaaa", 10)
    const user = new User({ username: 'otto', name: 'diangun', passwordHash: passwordHash})
    await user.save()
    
    await Blog.deleteMany({})
    const blogObjects = initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  }, 10000)

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('id is the unique identifier for blogs', async () => {
    const blogsAtStart = await Blog.find({})

    const blogToView = blogsAtStart[0]
    expect(api.get(`/api/blogs/${blogToView.toJSON().id}`)).toBeDefined()
})

test('post successfully create new blog', async () => {
    const res = await api
    .post('/api/login')
    .send({ username: 'otto', password: 'aaaa'})

    const token = 'Bearer ' + res.body.token

    const toBeCreated = {
        title: 'created blog',
        author: 'creator',
        url: 'www.post.com',
        likes: '0'
    }

    await api
        .post('/api/blogs')
        .send(toBeCreated)
        .set('Authorization', token)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
    const titles = blogsAtEnd.map(c => c.title)
    expect(titles).toContain('created blog')
})

test('missing likes property set to 0', async () => {
    const res = await api
    .post('/api/login')
    .send({ username: 'otto', password: 'aaaa'})

    const token = 'Bearer ' + res.body.token

    const toBeAdded = {
        title: 'created blog',
        author: 'creator',
        url: 'www.post.com',
        likes: undefined
    }

    await api
        .post('/api/blogs')
        .send(toBeAdded)
        .set('Authorization', token)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
    const addedBlog = await Blog.find({title:'created blog'})
    expect(addedBlog[0].likes).toEqual(0)
})

test('missing title given status 400', async () => {
    const res = await api
    .post('/api/login')
    .send({ username: 'otto', password: 'aaaa'})

    const token = 'Bearer ' + res.body.token

    const toBeAdded = {
        author: 'creator',
        url: 'www.notitleblog.com',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(toBeAdded)
        .set('Authorization', token)
        .expect(400)
})

test('missing url given status 400', async () => {
    const res = await api
    .post('/api/login')
    .send({ username: 'otto', password: 'aaaa'})

    const token = 'Bearer ' + res.body.token

    const toBeAdded = {
        title: 'no url blog',
        author: 'creator',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(toBeAdded)
        .set('Authorization', token)
        .expect(400)
})

test('delete with a valid id', async () => {
    const res = await api
    .post('/api/login')
    .send({ username: 'otto', password: 'aaaa'})

    const token = 'Bearer ' + res.body.token

    const blogsAtStart = await Blog.find({})
    const blogToDelete = blogsAtStart[0]

    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', token)
    .expect(204)

    const blogsAtEnd = (await Blog.find({})).map(b => b.toJSON())

    expect(blogsAtEnd).toHaveLength(
        blogsAtStart.length - 1
    )

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
})

test('update a blog', async() => {
    const blogsAtStart = await Blog.find({})
    const blogToUpdate = blogsAtStart[0]

    const newBlog = {
        title: 'Updated Title',
        author: 'somebody',
        url: 'www.test.com',
        likes: '15'
    }

    await api
    .put(`/api/blogs/${blogToUpdate.toJSON().id}`)
    .send(newBlog)

    const blogsAtEnd = (await Blog.find({})).map(b => b.toJSON())

    expect(blogsAtEnd).toHaveLength(
        blogsAtStart.length
    )

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(newBlog.title)
}, 50000)

afterAll(async () => {
    await mongoose.connection.close()
})