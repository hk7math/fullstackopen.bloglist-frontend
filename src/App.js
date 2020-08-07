import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    const userJSON = window.localStorage.getItem('loggedBlogappUser')
    setUser(JSON.parse(userJSON))
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser('')
  }

  return ! user
    ? <LoginForm setUser={setUser}/>
    : <div>
        <h2>blogs</h2>
        <div>
          {user.name} logged in
          <button onClick={logout}>logout</button>
        </div>
        <BlogForm user={user} setBlogs={setBlogs}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      
}

export default App