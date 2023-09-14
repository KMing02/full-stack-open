const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/api/users', async (request, response) => {
    const { username, name, password } = request.body

    if (password.length < 3) {
        response.status(400).send({ error: "password should be at least 3 characters long" })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      username,
      name,
      passwordHash,
    })
    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/api/users', async (request, response) => {
    const users = await User.find({})
    response.json(users)
})

module.exports = usersRouter