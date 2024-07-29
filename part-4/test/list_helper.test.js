const { test } = require('node:test')
const assert = require('node:assert')
const { dummy } = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)
  assert.strictEqual(result, 1)
})
