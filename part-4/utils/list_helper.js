const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (!Array.isArray(blogs)) return 0

  const sumTotal = blogs.reduce((acc, currentValue) => {
    return acc + currentValue.likes
  }, 0)
  return sumTotal
}

const favoriteBlog = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return {}

  const index = Math.max(...blogs.map(blog => blog.likes))
  return blogs.find(blog => blog.likes === index)
}

const mostBlogs = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return {}

  const authorCount = lodash.countBy(blogs, 'author')
  const mostAuthor = lodash.maxBy(Object.keys(authorCount), author => authorCount[author])
  const maxBlogs = authorCount[mostAuthor]

  return {
    author: mostAuthor,
    blogs: maxBlogs
  }
}

const mostLikes = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return {}

  const likesByAuthor = lodash.groupBy(blogs, 'author')
  const likesCount = lodash.mapValues(likesByAuthor, blogs => lodash.sumBy(blogs, 'likes'))
  const mostLikedAuthor = lodash.maxBy(Object.keys(likesCount), authorSimple => likesCount[authorSimple])
  const maxLikes = likesCount[mostLikedAuthor]

  return {
    author: mostLikedAuthor,
    likes: maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
