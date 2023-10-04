import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, setUsername, setPassword, username, password }) => (
  <form onSubmit={handleLogin}>
    <div>
      <h2>log in to application</h2>
    </div>
    <div>
        username
      <input
        type="text"
        value={username}
        id='username'
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
        password
      <input
        type="password"
        value={password}
        id='password'
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button id = 'login-button' type="submit">login</button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm