const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})

  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.post('/', async (req, res) => {
  const { title, author, url, likes = 0 } = req.body

  if (!title || !url || !author) {
    return res.status(400).json({ error: 'Bad request' })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes
  })

  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  await Blog.findByIdAndDelete(id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const blog = req.body

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
  res.json(updatedBlog)
})

module.exports = blogsRouter
