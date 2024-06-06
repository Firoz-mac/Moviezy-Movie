import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext'

function Favorites() {

  const userData=useContext(UserContext)

  const userId=userData.loggedUser.userId
  const token=userData.loggedUser.token

  const [favmovies,setFavmovies]=useState([])

  useEffect(() => {

    fetch(`http://127.0.0.1:8000/moviezy/favorite/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization":"Bearer "+token
      }

    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        setFavmovies(data)
      })
      .catch((err) => {
        console.log(err)
      })
    

  }, [])



  return (
    <section className='container'>

      <div className='favorite-section'>

        <div className='favorite-section-content-area'>
          <div className='favorite-section-content-area-head'>

            <h3>Favorited Movies</h3>

          </div>
         
          <div className='favorite-section-content-area-body'>
            {
              favmovies.map((movie,index)=>{
                return(

                  <div className='movie-card' key={index}>

                    <img className='movie-thumbnail' src={movie.image} alt="mac" />
    
                  </div>
                  
                )
              })
            }




          </div>

        </div>

      </div>

    </section>
  )
}

export default Favorites
