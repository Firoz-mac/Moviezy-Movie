import React from 'react'
import { Link } from 'react-router-dom'


function Navbtns() {
  return (
    <div className='nav-btns'>

        <button className='nav-btn black'><Link to={'/login'}>Sign In</Link></button>
        <button className='nav-btn green-color black'><Link to={'/register'}>Sign Up</Link></button>

    </div>
  )
}

export default Navbtns
