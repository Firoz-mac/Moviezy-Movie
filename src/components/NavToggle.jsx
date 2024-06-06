import React, { useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import NavLogout from './NavLogout'
import { UserContext } from '../Contexts/UserContext'
import Navbtns from './Navbtns'
import NavLogoutToggle from './NavLogoutToggle'

function NavToggle() {


  const loggedData=useContext(UserContext)

  const navigate=useNavigate()

  function handleClickHome(){

    navigate('/home')

  }
  function handleClickFav(){
    
    navigate('/favorites')

  }
  function handleClickWatch(){
    
    navigate('/watchlater')

  }


  return (
    <div className='nav-list-toggle'>
                <ul className='nav-list-toggle-ul'>
                    <li className='nav-item'>
                        <span onClick={handleClickHome}>Home</span>
                    </li>

                    <li className='nav-item'>
                        <span onClick={handleClickFav}>Favorites</span>
                    </li>

                    <li className='nav-item'>
                        <span onClick={handleClickWatch}>Watch Later</span>
                    </li>
                </ul>
                {loggedData.loggedUser==null? <Navbtns/> : <NavLogoutToggle/>}
                
    </div>
  )
}

export default NavToggle
