import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
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
import { AppBar, Button, CssBaseline, Toolbar, Typography, Container, Paper, List, ListItem, ListItemText, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  navStyle: {
    padding: 5,
    color: 'white',
    textDecoration: 'none'
  },
  alignRight: {
    display: 'flex',
    alignItems: 'baseline',
    marginLeft: 'auto'
  },
  list: {
    backgroundColor: theme.palette.background.paper
  }
}))

const App = () => {
  const classes = useStyles()
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
    dispatch(setNotification('You have logged out', 'error', 3000))
  }

  return (
    <>
      <CssBaseline />
      <AppBar position='static'>
        <Toolbar>
          <Button>
            <Link className={classes.navStyle} to='/blogs'>blogs</Link>
          </Button>
          <Button>
            <Link className={classes.navStyle} to='/users'>users</Link>
          </Button>
          <div className={classes.alignRight}>
            {!user
              ? (
                <Button>
                  <Link className={classes.navStyle} to='/login'>login</Link>
                </Button>
                )
              : (
                <>
                  <Typography className={classes.navStyle}> {user.name} </Typography>
                  <Button className={classes.navStyle} onClick={logout}>logout</Button>
                </>
                )}
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.root} maxWidth='md'>
        <Notification />
        <Switch>
          <Route path='/login'>
            {!user ? <LoginForm /> : <Redirect to='/blogs' />}
          </Route>
          <Route path='/users/:id'>
            <UserView />
          </Route>
          <Route path='/users'>
            <UserList />
          </Route>
          <Route path='/blogs/:id'>
            <Viewable />
          </Route>
          <Route path='/blogs'>
            {!user && <Redirect to='/login' />}
            <Typography variant='h4'>Blog APP</Typography>
            <Togglable buttonLabel='new blog'>
              <BlogForm />
            </Togglable>
            <Paper elevation={0}>
              <List className={classes.list}>
                {blogs.map(blog =>
                  <Link key={blog.id} to={`/blogs/${blog.id}`}>
                    <ListItem button>
                      <ListItemText primary={blog.title} />
                    </ListItem>
                    <Divider />
                  </Link>
                )}
              </List>
            </Paper>
          </Route>
          <Route path='/'>
            <Redirect to='/login' />
          </Route>
        </Switch>
      </Container>
    </>
  )
}

export default App
