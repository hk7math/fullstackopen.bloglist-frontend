import React, { useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Viewable from './components/Viewable'
import { setNotification } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogReducer'

const App = ({ setNotification, setBlogs }) => {
  const blogs = useSelector(state => state.blogs)
  const [user, setUser] = useState(null)
  const [toReload, setToReload] = useState(true)

  useEffect(() => {
    if (toReload) {
      const userJSON = window.localStorage.getItem('loggedBlogappUser')
      if (userJSON) {
        setBlogs()
      }
      if (userJSON && !user) setUser(JSON.parse(userJSON))
      setToReload(false)
    }
  }, [user, toReload, setBlogs])

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser('')
    setToReload(true)
    setNotification('You have logged out', 'red', 3000)
  }

  return (
    <>
      <h2>{!user ? 'Log in to application' : 'blogs'}</h2>
      <Notification />
      {!user
        ? <LoginForm setToReload={setToReload} setUser={setUser} />
        : (
          <div>
            <div>
              {user.name} logged in
              <button onClick={logout}>logout</button>
            </div>
            <Togglable buttonLabel='new blog'>
              <BlogForm user={user} setBlogs={setBlogs} setToReload={setToReload} />
            </Togglable>
            {
            blogs.map(blog =>
              <Viewable key={blog.id} blog={blog} currentUser={user} setToReload={setToReload} />
            )
          }
          </div>
          )}
    </>
  )
}

const mapDispatchToProps = { setNotification, setBlogs }

export default connect(
  null,
  mapDispatchToProps
)(App)
