import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, editBlogFunc, deleteBlogFunc, userName }) => {
  const [showDetails, setShowDetails] = useState(false)
  const { id, user, ...restBlog } = blog

  const blogStyle = {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '5px 20px',
    margin: '10px 0',
    backgroundColor: '#f9f9f9'
  }

  const handleLike = () => {
    const newLikes = blog.likes + 1
    const newBlog = {
      ...restBlog,
      likes: newLikes
    }

    editBlogFunc(id, newBlog)
  }

  const isDeleteBlog = user.username === userName

  return (
    <div style={blogStyle}>
      <h4>
        {blog.title} - {blog.author}
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </h4>
      <div style={{ display: showDetails ? '' : 'none' }}>
        <a href={blog.url}>{blog.url}</a>
        <p>
          likes: {blog.likes} <button onClick={handleLike}>like</button>
        </p>
        <p>{blog.user.name}</p>
        {isDeleteBlog && <button onClick={() => deleteBlogFunc(blog)}>Delete</button>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object,
  editBlogFunc: PropTypes.func,
  deleteBlogFunc: PropTypes.func,
  userName: PropTypes.string
}

export default Blog
