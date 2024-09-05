import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addNewBlog = (e) => {
    e.preventDefault()

    createNewBlog({
      title,
      author,
      url
    })
  }

  return (
    <form onSubmit={addNewBlog}>
      <div>
        title:
        <input
          type='text'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          type='text'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>Create</button>
    </form>
  )
}

BlogForm.propTypes = {
  createNewBlog: PropTypes.func
}

export default BlogForm
