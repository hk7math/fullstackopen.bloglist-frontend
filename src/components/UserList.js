import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'

const UserList = () => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    (async () => {
      const users = await userService.getAll()
      setUsers(users)
    })()
  }, [])

  return (
    <>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>blog created</th>
          </tr>
          {users && users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default UserList
