import React, { useEffect, useState } from 'react'
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
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default UserList
