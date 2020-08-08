import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [msg, setMsg] = useState([])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedBlogappUser')
    if (userJSON) blogService.getAll().then( blogs => setBlogs(blogs))
    if (userJSON && !user) setUser( JSON.parse(userJSON) )
  }, [user])

  useEffect(() => {
    if (msg[0]) setTimeout(() => setMsg([]), 3000)
  }, [msg])

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser('')
    setMsg([`You have logged out`,`red`])
  }

  return <>
    <h2>{!user ? 'Log in to application' : 'blogs'}</h2>
    <Notification msg={msg}/>
    {! user
    ? <LoginForm setUser={setUser} setMsg={setMsg}/>
    : <div>
        <div>
          {user.name} logged in
          <button onClick={logout}>logout</button>
        </div>
        <BlogForm user={user} setBlogs={setBlogs} setMsg={setMsg}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    }
  </>
}

export default App