const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('rootpassword', 10)
  const user = new User({
    username: 'root',
    name: 'Superuser',
    passwordHash
  })

  await user.save()

  console.log('<<<< Users reloaded >>>>')
})

test('creation succeeds with a fresh username', async () => {
  const usersAtStart = await usersInDb()

  const newUser = {
    username: 'userIvan',
    name: 'Ivan',
    password: 'ivanpass'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await usersInDb()
  assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

  const usernames = usersAtEnd.map(u => u.username)
  assert(usernames.includes(newUser.username))
})

test('creation fails with proper statuscode and message if username already taken', async () => {
  const usersAtStart = await usersInDb()

  const newUser = {
    username: 'root',
    name: 'Error User',
    password: 'errorpass'
  }

  const res = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await usersInDb()
  assert(res.body.error.includes('username to be unique'))
  assert(usersAtEnd.length, usersAtStart.length)
})

test('creation fails with proper statuscode and message if password must be less than 3 characters', async () => {
  const usersAtStart = await usersInDb()

  const newUser = {
    username: 'userIvan',
    name: 'Ivan',
    password: 'iv'
  }

  const res = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await usersInDb()
  assert(res.body.error.includes('password must be at least 3 characters long'))
  assert(usersAtEnd.length, usersAtStart.length)
})

test('creation fails with proper statuscode and message if password is missing', async () => {
  const usersAtStart = await usersInDb()

  const newUser = {
    name: 'No Password'
  }

  const res = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await usersInDb()
  assert(res.body.error.includes('username and password are required'))
  assert(usersAtEnd.length, usersAtStart.length)
})

after(async () => {
  await mongoose.connection.close()
})
