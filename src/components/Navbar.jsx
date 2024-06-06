import React, { useState,useContext, useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faX } from '@fortawesome/free-solid-svg-icons'
import NavToggle from './NavToggle'
import NavLogout from './NavLogout'
import { UserContext } from '../Contexts/UserContext'
import Navbtns from './Navbtns'
import { SearchClickContext } from '../Contexts/SearchClickContext'
import { SearchMovieContext } from '../Contexts/SearchMovieContext'


function Navbar() {

    const loggedData=useContext(UserContext)

    const searchClick=useContext(SearchClickContext)

    const [search,setSearch]=useState('')

    const searchedMovieData=useContext(SearchMovieContext)
    

    const [toggle,setToggle]=useState(false)

    const navigate=useNavigate()


    function showMenu(){
        setToggle(!toggle)
        console.log(toggle)
    }

    function handleClickHome(){

        navigate('/home')

    }
    function handleClickFav(){
        
        navigate('/favorites')

    }
    function handleClickWatch(){
        
        navigate('/watchlater')

    }

    function onSearchClick(event){

        setSearch(event.target.value)

        fetch(`http://127.0.0.1:8000/movies/${event.target.value}`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response)=>response.json())
        .then((data)=>{

            if (data.message==null){

                searchedMovieData.setSearchMovie(data)

            }

            
        })
        .catch((err)=>{
            console.log(err)
        })
        
        

        if(search!=null){

            searchClick.setSearchClick(true)

        }

    }

    useEffect(()=>{
        if(search.length==0){
            searchClick.setSearchClick(false)
        }
    },[search])

    function onClickAdminCheck(){

        const adminMac=`66422a9b04fb3a3eb169e358`
        

        if(loggedData.loggedUser.userId==adminMac){
            
            navigate('/admin')
        }
        else{
            
        }

    }

    


  return (
    <section className='nav-header'>

        <nav className='nav'>

            <a onClick={onClickAdminCheck}  className='nav-logo'>Moviezy</a>

            <div className='nav-search-section'>

                <input className='nav-search' onChange={onSearchClick} type="search" placeholder='Search Movies'></input>

            </div>
            

            <div className='nav-menu'>
                <ul className='nav-list'>
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

            </div>
            <div className='menu-btn-toggle'>

                <i className='toggle-btn' onClick={showMenu}><FontAwesomeIcon icon={faBars}/></i>

            </div>


            {loggedData.loggedUser==null? <Navbtns/> : <NavLogout/>}

            
            

        </nav>

        {toggle ? <NavToggle/>:null}

        
        

    </section>
  )
}

export default Navbar
