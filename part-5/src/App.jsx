import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { getAllBlogs, setToken, addBlog } from './services/blogs'
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

  return (
    <main>
      {user ? (
        <section>
          <h2>blogs</h2>
          <Noti errorMessage={errorMessage} successMessage={successMessage} />
          <p>
            {user.name} logged in
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
            <Blog key={blog.id} blog={blog} />
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
