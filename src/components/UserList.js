import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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

const UserList = () => {
  const classes = useStyles()
  const [users, setUsers] = useState(null)

  useEffect(() => {
    (async () => {
      const users = await userService.getAll()
      setUsers(users)
    })()
  }, [])

  return (
    <Card className={classes.root}>
      <Typography variant='h4'>Users</Typography>
      <TableContainer component={Card}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Blog Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default UserList
