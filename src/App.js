import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import UserView from './components/UserView'
import Viewable from './components/Viewable'
import { setNotification } from './reducers/notificationReducer'
import { setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    const userJSON = window.localStorage.getItem('loggedBlogappUser')
    if (userJSON) {
      dispatch(setBlogs())
    }
    if (userJSON && !user) dispatch(setUser(JSON.parse(userJSON)))
  }, [user, dispatch])

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
    dispatch(setNotification('You have logged out', 'red', 3000))
  }

  return (
    <>
      <h2>{!user ? 'Log in to application' : 'blogs'}</h2>
      <Notification />
      {!user
        ? <LoginForm />
        : (
          <div>
            <div>
              {user.name} logged in
              <br />
              <button onClick={logout}>logout</button>
            </div>
            <Switch>
              <Route path='/blogs/:id'>
                <Viewable />
              </Route>
              <Route path='/users/:id'>
                <UserView />
              </Route>
              <Route path='/users'>
                <UserList />
              </Route>
              <Route path='/'>
                <Togglable buttonLabel='new blog'>
                  <BlogForm user={user} />
                </Togglable>
                {blogs.map(blog =>
                  <div key={blog.id} style={{ border: '1px solid', padding: '2px' }} className='blog'>
                    <Link to={`/blogs/${blog.id}`}>
                      {blog.title}
                      <br />
                    </Link>
                  </div>
                )}
              </Route>
            </Switch>
          </div>
          )}
    </>
  )
}

export default App
