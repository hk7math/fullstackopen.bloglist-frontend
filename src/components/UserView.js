import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import userService from '../services/users'
import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

const UserView = () => {
  const classes = useStyles()
  const match = useRouteMatch('/users/:id')
  const [user, setUser] = useState(null)

  useEffect(() => {
    (async () => {
      const users = await userService.getAll()
      const user = users.find(user => user.id === match.params.id)
      setUser(user)
    })()
  }, [match.params.id])

  return (
    <Card className={classes.root}>
      <Typography variant='h4'>{user ? user.name : '----'}</Typography>
      <TableContainer component={Card}>
        <Table size='small' aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Likes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user && user.blogs.map(blog => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
                <TableCell>{blog.likes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
    // <>
    //   <h2></h2>
    //   <h3>added blogs</h3>
    //   <ul>
    //     {user && user.blogs.map(blog => (
    //       <li key={blog.id}>
    //         {blog.title}
    //       </li>
    //     ))}
    //   </ul>
    // </>
  )
}

export default UserView
