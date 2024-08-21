import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { getAllBlogs } from './services/blogs'
import { signIn } from './services/login'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (user) {
      getAllBlogs().then((blogs) => setBlogs(blogs))
    }
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    const user = await signIn({
      username,
      password,
    })

    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    setUser(user)
  }

  const handleLogout = (e) => {
    e.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return (
    <main>
      {user ? (
        <section>
          <h2>blogs</h2>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </section>
      ) : (
        <section>
          <h2>log in to application</h2>
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
