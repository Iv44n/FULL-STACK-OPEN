const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', {
      username: 1,
      name: 1
    })

  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog
    .findById(req.params.id)
    .populate('user', {
      username: 1,
      name: 1
    })

  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.post('/', async (req, res) => {
  const { title, author, url, likes = 0 } = req.body
  const user = req.user

  if (!title || !url || !author) {
    return res.status(400).json({ error: 'Bad request' })
  }

  if (!user) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const blogId = req.params.id
  const user = req.user

  if (!user) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(blogId)

  if (!blog) {
    return res.status(404).json({ error: 'blog not found' })
  }

  if (user._id.toString() === blog.user.toString()) {
    await Blog.findByIdAndDelete(blog._id)
    res.status(204).end()
  } else {
    return res.status(403).json({ error: 'unauthorized' })
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const id = req.params.id
  const blog = req.body

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
  res.json(updatedBlog)
})

module.exports = blogsRouter
