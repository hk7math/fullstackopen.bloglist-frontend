import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'

const LoginForm = ({ setUser, setToReload, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setNotification('Loading...', 'grey', 3000)
    setUsername('')
    setPassword('')
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setToReload(true)
      setNotification(`Successfully logged in as ${user.name}`, 'green', 3000)
    } catch (e) {
      setNotification(e.message, 'red', 3000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          id='username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          id='password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit' id='login-button'>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setToReload: PropTypes.func.isRequired
}

const mapDispatchToProps = { setNotification }

export default connect(
  null,
  mapDispatchToProps
)(LoginForm)
