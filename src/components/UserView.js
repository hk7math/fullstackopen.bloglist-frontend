import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import userService from '../services/users'

const UserView = () => {
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
    <>
      <h2>{user ? user.name : '----'}</h2>
      <h3>added blogs</h3>
      <ul>
        {user && user.blogs.map(blog => (
          <li key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </>
  )
}

export default UserView
