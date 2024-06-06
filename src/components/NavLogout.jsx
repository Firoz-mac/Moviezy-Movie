import React from 'react'
import { Link,useNavigate } from 'react-router-dom'

function NavLogout() {

    const navigate=useNavigate()

    function logout(){

        localStorage.removeItem('moviezy-user')
        navigate('/login')

    }



    return (

        <div className='nav-btns-logout'>

            
            <button onClick={logout} className='nav-btn green-color black'>Log out</button>

        </div>
    )
}

export default NavLogout
