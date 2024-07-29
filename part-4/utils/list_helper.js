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

module.exports = {
  dummy, totalLikes
}
