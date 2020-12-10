import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogReducer'
import { makeStyles } from '@material-ui/core/styles'
import { FormControl, InputLabel, OutlinedInput, Button } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    },
    display: 'flex',
    flexDirection: 'column'
  }
}))

const BlogForm = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (e) => {
    e.preventDefault()
    dispatch(setNotification('Loading...', 'info', 3000))
    const blog = { title, author, url }
    const config = { headers: { Authorization: `bearer ${user.token}` } }
    dispatch(addBlog(blog, config))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form className={classes.root} onSubmit={createBlog}>
        <FormControl variant='outlined'>
          <InputLabel htmlfor='title'>Title</InputLabel>
          <OutlinedInput
            type='text'
            value={title}
            id='blog-title'
            label='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </FormControl>
        <FormControl variant='outlined'>
          <InputLabel htmlfor='author'>Author</InputLabel>
          <OutlinedInput
            type='text'
            value={author}
            id='blog-author'
            label='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </FormControl>
        <FormControl variant='outlined'>
          <InputLabel htmlfor='url'>URL</InputLabel>
          <OutlinedInput
            type='text'
            value={url}
            id='blog-url'
            label='URL'
            onChange={({ target }) => setUrl(target.value)}
          />
        </FormControl>
        <Button color='primary' variant='contained' id='blog-create' type='submit'>Create</Button>
      </form>
    </div>
  )
}

export default BlogForm
