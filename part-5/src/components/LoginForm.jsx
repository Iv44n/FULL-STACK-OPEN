import { useState } from 'react'

const LoginForm = ({ signIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    signIn({
      username,
      password,
    })
  }

  return (
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
  )
}

export default LoginForm
