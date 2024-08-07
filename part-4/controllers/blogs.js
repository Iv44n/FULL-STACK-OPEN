const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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

  if (!title || !url || !author) {
    return res.status(400).json({ error: 'Bad request' })
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

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

  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }

  const [user, blog] = await Promise.all([
    User.findById(decodedToken.id),
    Blog.findById(blogId)
  ])

  if (!user) {
    return res.status(404).json({ error: 'token missing or invalid' })
  }

  if (!blog) {
    return res.status(404).json({ error: 'blog or user not found' })
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
