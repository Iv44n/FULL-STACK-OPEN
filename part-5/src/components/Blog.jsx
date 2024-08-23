import { useState } from 'react'

const Blog = ({ blog, editBlogFunc }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '5px 20px',
    margin: '10px 0',
    backgroundColor: '#f9f9f9',
  }

  const handleLike = () => {
    const { id, user, ...restBlog } = blog

    const newLikes = blog.likes + 1
    const newBlog = {
      ...restBlog,
      likes: newLikes,
    }

    editBlogFunc(id, newBlog)
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
          likes: {blog.likes} <button onClick={handleLike}>like</button>
        </p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog
