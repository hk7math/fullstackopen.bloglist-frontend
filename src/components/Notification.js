import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const [text, color] = useSelector(state => state.notification)
  return (
    <div id='message' style={{ color }}>
      {text}
    </div>
  )
}

export default Notification
