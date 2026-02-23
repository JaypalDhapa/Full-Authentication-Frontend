import React from 'react'
import { Link } from 'react-router-dom'

const home = () => {
  return (
    <div>
      <h1>Hello from home page</h1>
      <Link to="/signup">signup</Link>
    </div>
  )
}

export default home
