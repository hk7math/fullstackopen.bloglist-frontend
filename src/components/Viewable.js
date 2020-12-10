import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch, Redirect, Link } from 'react-router-dom'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import {
  Button, Paper, Card, CardActions,
  FormControl, InputLabel, OutlinedInput,
  TableContainer, Typography, TableHead, Table, TableRow, TableCell, TableBody
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  comment: {
    display: 'flex',
    alignItems: 'baseline',
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}))

const Viewable = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const [comment, setComment] = useState('')
  const match = useRouteMatch('/blogs/:id')

  const blog = blogs.find(blog => blog.id === match.params.id)
  if (!blog) return <Redirect to='/blogs' />
  const { title, url, author, user, likes, comments } = blog

  const clickLike = () => {
    dispatch(likeBlog(blog))
  }

  const clickRemove = async () => {
    const res = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (res) {
      const config = { headers: { Authorization: `bearer ${currentUser.token}` } }
      dispatch(removeBlog(blog, config))
    }
  }

  const clickComment = async () => {
    dispatch(commentBlog(blog, comment))
    setComment('')
  }

  return (
    <Card elevation={1} className={classes.root}>
      <Typography variant='h4'>{title} {author}</Typography>
      <Typography variant='subtitle1'> Submitted by <Link to={`/users/${user.id}`}>{user.name}</Link> </Typography>

      <CardActions>
        <Button variant='contained' size='small'><a href={url}>Link</a></Button>
        <Button variant='contained' color='primary' size='small' onClick={clickLike}>{`${likes} Like${likes > 1 && 's'}`}</Button>
        {
          currentUser.username === user.username &&
            <Button variant='contained' color='secondary' size='small' onClick={clickRemove}>Lost</Button>
        }
      </CardActions>

      <div className={classes.comment}>
        <FormControl variant='outlined'>
          <InputLabel htmlFor='title'>Comment</InputLabel>
          <OutlinedInput
            type='text'
            value={comment}
            id='comment'
            label='Comment'
            onChange={({ target }) => setComment(target.value)}
          />
        </FormControl>
        <Button onClick={clickComment} size='large'>Add</Button>
      </div>
      {!!comments.length && (
        <TableContainer component={Paper}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Comment</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {comments.map(comment =>
                <TableRow key={comment.date}>
                  <TableCell>{comment.body}</TableCell>
                  <TableCell>{comment.date}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Card>
  )
}

export default Viewable
