import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ signIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()

    signIn({
      username,
      password
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

LoginForm.propTypes = {
  signIn: PropTypes.func
}

export default LoginForm
