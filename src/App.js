import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Viewable from './components/Viewable'
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

  const popMsg = (text, color, duration) => {
    setMsg([text, color])
    setTimeout(() => setMsg([]), duration)
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser('')
    popMsg(`You have logged out`,`red`, 3000)
  }

  return <>
    <h2>{!user ? 'Log in to application' : 'blogs'}</h2>
    <Notification msg={msg}/>
    {! user
    ? <LoginForm setUser={setUser} popMsg={popMsg}/>
    : <div>
        <div>
          {user.name} logged in
          <button onClick={logout}>logout</button>
        </div>
        <Togglable buttonLabel='new blog'>
          <BlogForm user={user} setBlogs={setBlogs} popMsg={popMsg}/>
        </Togglable>
        {
          blogs.map(blog =>
            <Viewable key={blog.id} blog={blog} />
          )
        }
      </div>
    }
  </>
}

export default App