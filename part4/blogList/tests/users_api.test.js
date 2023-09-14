const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

initialUsers = [
    {
        username: "otto",
        name: "diangun",
        passwordHash: "aaaa",
        notes: []
    },
    {
        username: "diangun",
        name: "otto",
        passwordHash: "aaa",
        notes: []
    }
]


beforeEach(async () => {
    await User.deleteMany({})
  
    const userObjects = initialUsers
      .map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
  }, 10000)

describe("invalid user should not be created", () => {
    test("minlength of username is 3", async () => {
        const newUser = {
            username: "ot",
            name: "otto",
            password: "123123"
        }
        await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    }, 10000)

    test("minlength of password is 3", async () => {
        const newUser = {
            username: "oooo",
            name: "otto",
            password: "13"
        }
        await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    }, 10000)

    test("valid user created", async () => {
        const newUser = {
            username: "ottto",
            name: "otto",
            password: "12306"
        }
        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
    })
})
