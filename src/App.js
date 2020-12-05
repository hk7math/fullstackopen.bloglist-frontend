import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Viewable from './components/Viewable'
import { setNotification } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedBlogappUser')
    if (userJSON) {
      dispatch(setBlogs())
    }
    if (userJSON && !user) setUser(JSON.parse(userJSON))
  }, [user, dispatch])

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser('')
    dispatch(setNotification('You have logged out', 'red', 3000))
  }

  return (
    <>
      <h2>{!user ? 'Log in to application' : 'blogs'}</h2>
      <Notification />
      {!user
        ? <LoginForm setUser={setUser} />
        : (
          <div>
            <div>
              {user.name} logged in
              <button onClick={logout}>logout</button>
            </div>
            <Togglable buttonLabel='new blog'>
              <BlogForm user={user} />
            </Togglable>
            {
            blogs.map(blog =>
              <Viewable key={blog.id} blog={blog} currentUser={user} />
            )
          }
          </div>
          )}
    </>
  )
}

export default App
