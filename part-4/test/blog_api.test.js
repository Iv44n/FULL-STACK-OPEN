const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Test Blog 1',
    author: 'Test Author 1',
    url: 'url test 1',
    likes: 7
  },
  {
    title: 'Test Blog 2',
    author: 'Test Author 2',
    url: 'url test 2',
    likes: 5
  },
  {
    title: 'Test Blog 3',
    author: 'Test Author 3',
    url: 'url test 3',
    likes: 10
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
  console.log('<<<< Blogs reloaded >>>>')
})

test('there are three blogs', async () => {
  const res = await api.get('/api/blogs/').expect(200).expect('Content-Type', /application\/json/)

  assert.strictEqual(res.body.length, initialBlogs.length)
})

test('blog has id property', async () => {
  const res = await api.get('/api/blogs/')

  res.body.forEach(blog => assert(blog.id))
})

test('add new blog', async () => {
  const newBlog = {
    title: 'Test Blog 4',
    author: 'Test Author 4',
    url: 'url test 4',
    likes: 3
  }
  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/blogs/')
  assert.strictEqual(res.body.length, initialBlogs.length + 1)

  const titles = res.body.map(blog => blog.title)
  assert(titles.includes(newBlog.title))
})

test('if the likes property is missing, it is set to 0', async () => {
  const newBlog = {
    title: 'Test Blog 4',
    author: 'Test Author 4',
    url: 'url test 4'
  }

  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/blogs/')
  const newBlogAdded = res.body.find(blog => blog.title === newBlog.title)
  assert(newBlogAdded.likes === 0)
})

test('if title and url are missing, 400 is returned', async () => {
  const newBlog = {
    author: 'Test Author 4',
    likes: 3
  }

  await api
    .post('/api/blogs/')
    .send(newBlog)
    .expect(400)

  const res = await api.get('/api/blogs/')
  assert.strictEqual(res.body.length, initialBlogs.length)
})

after(async () => {
  await mongoose.connection.close()
})
