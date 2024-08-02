const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { initialBlogs, blogsInDb } = require('./blog_helper')

const api = supertest(app)

describe('testing of the blog api, when initially there are some saved blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    console.log('<<<< Blogs reloaded >>>>')
  })

  describe('methods get', () => {
    test('there are three blogs', async () => {
      const res = await api.get('/api/blogs/').expect(200).expect('Content-Type', /application\/json/)

      assert.strictEqual(res.body.length, initialBlogs.length)
    })

    test('succeeds with valid id', async () => {
      const blogsAtStart = await blogsInDb()
      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultBlog.body, blogToView)
    })

    test('blog has id property', async () => {
      const res = await api.get('/api/blogs/')

      res.body.forEach(blog => assert(blog.id))
    })
  })

  describe('methods post', () => {
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

      const blogs = await blogsInDb()
      assert.strictEqual(blogs.length, initialBlogs.length + 1)

      const titles = blogs.map(blog => blog.title)
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

      const blogs = await blogsInDb()
      const newBlogAdded = blogs.find(blog => blog.title === newBlog.title)
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

      const blogs = await blogsInDb()
      assert.strictEqual(blogs.length, initialBlogs.length)
    })
  })

  describe('methods delete', () => {
    test('a blog can be deleted', async () => {
      const blogs = await blogsInDb()
      const blogToDelete = blogs[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await blogsInDb()
      const ids = blogsAtEnd.map(blog => blog.id)
      assert(!ids.includes(blogToDelete.id))

      assert.strictEqual(blogsAtEnd.length, initialBlogs.length - 1)
    })
  })

  describe('methods put', () => {
    test('a blog can be updated', async () => {
      const blogs = await blogsInDb()
      const blogToUpdate = blogs[0]

      blogToUpdate.likes = blogToUpdate.likes + 1

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)

      const blogsAtEnd = await blogsInDb()
      assert.strictEqual(blogsAtEnd[0].likes, blogToUpdate.likes)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
