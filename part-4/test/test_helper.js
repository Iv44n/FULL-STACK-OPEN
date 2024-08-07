const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Test Blog 1',
    author: 'Test Author 1',
    url: 'url test 1',
    likes: 7,
    user: null
  },
  {
    title: 'Test Blog 2',
    author: 'Test Author 2',
    url: 'url test 2',
    likes: 5,
    user: null
  },
  {
    title: 'Test Blog 3',
    author: 'Test Author 3',
    url: 'url test 3',
    likes: 10,
    user: null
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const newUser = async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('rootpassword', 10)
  const user = new User({
    username: 'root',
    name: 'Superuser',
    passwordHash
  })
  const userToSave = await user.save()
  return userToSave
}

const createToken = async () => {
  const { body } = await api
    .post('/api/login')
    .send({ username: 'root', password: 'rootpassword' })

  const token = body.token
  return token
}

module.exports = {
  api,
  initialBlogs,
  blogsInDb,
  usersInDb,
  newUser,
  createToken
}
