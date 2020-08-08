import React from 'react'

const Notification = ({ msg }) => {
  const [text, color] = msg
  return (
    <div style={{color}}>
      {text}
    </div>
  )
}

export default Notification