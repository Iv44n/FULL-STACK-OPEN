const { test, describe } = require('node:test')
const assert = require('node:assert')
const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../utils/list_helper')

const blogsArrayEmpty = []
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]
const blogsArray = [
  {
    title: 'title 1',
    author: 'author a',
    likes: 7
  },
  {
    title: 'title 2',
    author: 'author b',
    likes: 5
  },
  {
    title: 'title 3',
    author: 'author c',
    likes: 10
  },
  {
    title: 'title 4',
    author: 'author d',
    likes: 0
  },
  {
    title: 'title 5',
    author: 'author a',
    likes: 2
  },
  {
    title: 'title 3',
    author: 'author c',
    likes: 12
  }
]

test('dummy returns one', () => {
  const result = dummy(blogsArrayEmpty)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})

describe('favoriteBlog', () => {
  test('without passing blogs', () => {
    const result = favoriteBlog()
    assert.deepStrictEqual(result, {})
  })

  test('with an empty blog array', () => {
    const result = favoriteBlog(blogsArrayEmpty)
    assert.deepStrictEqual(result, {})
  })

  test('most liked of a array of blogs', () => {
    const result = favoriteBlog(blogsArray)
    assert.deepStrictEqual(result, blogsArray[5])
  })
})

describe('most blogs', () => {
  test('without passing blogs', () => {
    const result = mostBlogs()
    assert.deepStrictEqual(result, {})
  })

  test('with an empty array', () => {
    const result = mostBlogs(blogsArrayEmpty)
    assert.deepStrictEqual(result, {})
  })

  test('with a blog array', () => {
    const result = mostBlogs(blogsArray)

    assert.deepStrictEqual(result, {
      author: 'author a',
      blogs: 2
    })
  })
})

describe('the author with the most likes', () => {
  test('without passing blogs', () => {
    const result = mostLikes()
    assert.deepStrictEqual(result, {})
  })

  test('with an empty array', () => {
    const result = mostLikes(blogsArrayEmpty)
    assert.deepStrictEqual(result, {})
  })

  test('with a blog array', () => {
    const result = mostLikes(blogsArray)

    assert.deepStrictEqual(result, {
      author: 'author c',
      likes: 22
    })
  })
})
