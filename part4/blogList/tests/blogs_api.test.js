const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const blogsRouter = require('../models/blogs')

beforeEach(async () => {
    await Note.deleteMany({})
  
    const noteObjects = helper.initialNotes
      .map(note => new Note(note))
    const promiseArray = noteObjects.map(note => note.save())
    await Promise.all(promiseArray)
  }, 10000)