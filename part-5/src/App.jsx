import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { getAllBlogs, setToken, addBlog } from './services/blogs'
import { signIn } from './services/login'
import Noti from './components/Noti'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await signIn({
        username,
        password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
    } catch (error) {
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage('')
      }, 2000)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createNewBlog = async (e) => {
    e.preventDefault()

    try {
      const res = await addBlog({
        title,
        author,
        url
      })

      setBlogs(prevBlog => [...prevBlog, res])

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

    setTitle('')
    setAuthor('')
    setUrl('')
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
            <h2>Create new</h2>
            <form onSubmit={createNewBlog}>
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
          <form onSubmit={handleLogin}>
            <div>
              username:
              <input
                type='text'
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <div>
              password:
              <input
                type='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <button type='submit'>login</button>
          </form>
        </section>
      )}
    </main>
  )
}

export default App
