import React from 'react'

import { Link } from "react-router-dom"

const Navigation=({username})=>{
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
  }
  const padding = {
    padding: 5
  }
  return(
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">

        <Link className='navbar-item' to='/' style={padding}>blogs</Link>

       
       <Link className='navbar-item' to='/users' style={padding}>users</Link>
       <div className='navbar-item'>
        {username} logged in <button className='button is-small is-text' onClick={handleLogout}>logout</button>
       </div>

      </div>
    </nav>
    
  )
}

export default Navigation