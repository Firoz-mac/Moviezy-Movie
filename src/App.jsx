
import './App.css'
import { BrowserRouter, Routes, Route,useNavigate } from "react-router-dom";
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home';
import SingleMovieDetail from './components/SingleMovieDetail';
import { MovieIdContext } from './Contexts/MovieIdContext';
import { useEffect, useState } from 'react';
import { UserContext } from './Contexts/UserContext';
import { SearchClickContext } from './Contexts/SearchClickContext';
import { SearchMovieContext } from './Contexts/SearchMovieContext';
import Favorites from './components/Favorites';
import Watchlater from './components/Watchlater';
import AdminPanel from './components/AdminPanel';


function App() {
  
  const navigate=useNavigate()

  const [movieId,setMovieId]=useState(null)

  const [loggedUser,setLoggedUser]=useState(null)

  const [searchClick,setSearchClick]=useState(false)

  const [searchMovie,setSearchMovie]=useState()

  useEffect(()=>{

    // console.log('from app',loggedUser)
    if(localStorage.getItem('moviezy-user')!=null){


      setLoggedUser(JSON.parse(localStorage.getItem('moviezy-user')))

      navigate('/home')

    }
    else{

      navigate('/login')

    }

  },[])

  return (
    <>
    <SearchMovieContext.Provider value={{searchMovie,setSearchMovie}}>
      <SearchClickContext.Provider value={{searchClick,setSearchClick}}>
        <UserContext.Provider value={{loggedUser,setLoggedUser}}>
          <MovieIdContext.Provider value={{movieId,setMovieId}}>
            
              <Routes>
                {/* <Route path='/' element={<Login/>}/> */}
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/home' element={<Home/>}/>
                <Route path='/movieDetail' element={<SingleMovieDetail/>}/>
                <Route path='/favorites' element={<Favorites/>}/>
                <Route path='/watchlater' element={<Watchlater/>}/>
                <Route path='/admin' element={<AdminPanel/>}/>
              </Routes>
            
          </MovieIdContext.Provider>
        </UserContext.Provider>
      </SearchClickContext.Provider>
    </SearchMovieContext.Provider>

    
    
      
    </>
  )
}

export default App
