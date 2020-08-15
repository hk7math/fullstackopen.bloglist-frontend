import React, { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ setUser, popMsg, setToReload }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    popMsg(`Loading...`, `grey`, 3000)
    setUsername('')
    setPassword('')
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setToReload(true)
      popMsg(`Successfully logged in as ${user.name}`,`green`, 3000)
    } catch (e) {
      popMsg(e.message, `red`, 3000)
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
          onChange={({target}) => setUsername(target.value)} 
        />
      </div>
      <div>
        password
        <input 
          type='password' 
          value={password} 
          name='Password' 
          onChange={({target}) => setPassword(target.value)} 
        />
      </div>
      <button type='submit'>login</button>
    </form>
)}

export default LoginForm