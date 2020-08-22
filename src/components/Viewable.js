import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Viewable = ({ blog, currentUser, setToReload, popMsg }) => {
  const { title, url, author, user, likes } = blog
  const [isHidden, setIsHidden] = useState(true)
  const toggleHidden = () => setIsHidden(prev => !prev)
  const likeBlog = async () => {
    await blogService.likeBlog(blog)
    popMsg(`blog ${blog.title} by ${blog.author} is liked`,'green', 3000)
    setToReload(true)
  }
  const removeBlog = async () => {
    const res = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (res) {
      const config = { headers: { Authorization: `bearer ${currentUser.token}` } }
      await blogService.deleteBlog(blog, config)
      popMsg(`blog ${blog.title} by ${blog.author} is removed`,'red', 3000)
      setToReload(true)
    }
  }

  return (
    <div style={{ border: '1px solid', padding: '2px' }} className='blog'>
      {`${title} ${author}`} <button onClick={toggleHidden}>{isHidden ? 'view' : 'hide'}</button>
      {
        isHidden ||
          <div>
            {url}
            <br/>
            {`likes ${likes} `}
            <button data-testid='likeButton' onClick={likeBlog}>like</button>
            <br/>
            {user.name}
            <br/>
            { currentUser.username===user.username && <button onClick={removeBlog}>remove</button>}
          </div>
      }
    </div>
  )
}

Viewable.propTypes = {
  blog: PropTypes.exact({
    id: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  }),
  currentUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
  }),
  setToReload: PropTypes.func,
  popMsg: PropTypes.func,

}

export default Viewable