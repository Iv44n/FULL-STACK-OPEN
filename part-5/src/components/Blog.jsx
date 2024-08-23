import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '5px 20px',
    margin: '10px 0',
    backgroundColor: '#f9f9f9',
  }

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
          likes: {blog.likes} <button>like</button>
        </p>
        <p>Author: {blog.author}</p>
      </div>
    </div>
  )
}

export default Blog
