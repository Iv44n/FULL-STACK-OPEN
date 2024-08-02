const Blog = require('../models/blog')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}
