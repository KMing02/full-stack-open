const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')

initialUsers = [
    {
        username: "otto",
        name: "diangun",
        password: "aaaa",
        notes: []
    }
]


beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("aaaa", 10)

    const user = new User({ username: 'otto', name: 'diangun', passwordHash: passwordHash})
    await user.save()
  }, 10000)

describe("invalid user should not be created", () => {
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

    test("user with username shorter than 3 chars will not be created", async () => {
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

    test("user with password shorter than 3 chars will not be created", async () => {
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

    test("creating user of an existing username will fail", async () => {
        const newUser = {
            username: "otto",
            name: "otto",
            password: "1345"
        }
    })
})
