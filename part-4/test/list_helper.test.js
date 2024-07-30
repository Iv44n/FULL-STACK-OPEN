const { test, describe } = require('node:test')
const assert = require('node:assert')
const { dummy, totalLikes, favoriteBlog, mostBlogs } = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
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
    const blogs = []
    const result = favoriteBlog(blogs)
    assert.deepStrictEqual(result, {})
  })

  test('most liked of a array of blogs', () => {
    const blogs = [
      { name: 'blog 1', likes: 1 },
      { name: 'blog 2', likes: 7 },
      { name: 'blog 3', likes: 10 },
      { name: 'blog 4', likes: 2 },
      { name: 'blog 5', likes: 15 }
    ]

    const result = favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[4])
  })
})

describe('most blogs', () => {
  test('without passing blogs', () => {
    const result = mostBlogs()
    assert.deepStrictEqual(result, {})
  })

  test('with an empty array', () => {
    const blogs = []

    const result = mostBlogs(blogs)
    assert.deepStrictEqual(result, {})
  })

  test('with a blog array', () => {
    const blogs = [
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
      }
    ]

    const result = mostBlogs(blogs)

    assert.deepStrictEqual(result, {
      author: 'author a',
      blogs: 2
    })
  })
})
