import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { getAllBlogs, setToken, addBlog, updateBlog, deleteBlogById } from './services/blogs'
import { signIn } from './services/login'
import Noti from './components/Noti'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (user) {
      setToken(user.token)
      getAllBlogs().then((blogs) => setBlogs(blogs))
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (userLoginObject) => {
    try {
      const user = await signIn(userLoginObject)

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage('')
      }, 2000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createNewBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    try {
      const res = await addBlog(blogObject)

      setBlogs((prevBlog) => [...prevBlog, res])

      setSuccessMessage(`A new blog ${res.title} by ${res.author}`)
      setTimeout(() => {
        setSuccessMessage('')
      }, 4000)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage('')
      }, 2000)
    }
  }

  const editBlog = async (id, newBlog) => {
    try {
      const res = await updateBlog(id, newBlog)
      setBlogs(
        blogs.map((prevBlog) => (prevBlog.id === res.id ? res : prevBlog))
      )
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage('')
      }, 2000)
    }
  }

  const deleteBlog = async (blogForDelete) => {
    const windowMessage = `Remove blog ${blogForDelete.title} by ${blogForDelete.author}`
    if(!window.confirm(windowMessage)) return

    try {
      const status = await deleteBlogById(blogForDelete.id)
      if(status === 204) {
        setBlogs(blogs.filter(blog => blog.id !== blogForDelete.id))
      }
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage('')
      }, 2000)
    }
  }

  const sortedBlogsByLikes = blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)

  return (
    <main>
      {user ? (
        <section>
          <h2>blogs</h2>
          <Noti errorMessage={errorMessage} successMessage={successMessage} />
          <p>
            {sortedBlogsByLikes.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <div>
            <Togglable buttonLabel='New Note' ref={blogFormRef}>
              <h2>Create new</h2>
              <BlogForm createNewBlog={createNewBlog} />
            </Togglable>
          </div>
          <br />
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              editBlogFunc={editBlog}
              deleteBlogFunc={deleteBlog}
              userName={user.username}
            />
          ))}
        </section>
      ) : (
        <section>
          <h2>log in to application</h2>
          <Noti errorMessage={errorMessage} successMessage={successMessage} />
          <LoginForm signIn={handleLogin} />
        </section>
      )}
    </main>
  )
}

export default App
