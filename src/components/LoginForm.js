import React, { useState } from 'react'
import loginService from '../services/login'

const LoginForm = ({ setUser, setMsg}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setMsg([`Loading...`, `grey`])
    setUsername('')
    setPassword('')
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setMsg([`Successfully logged in as ${user.name}`,`green`])
    } catch (e) {
      console.log(e)
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