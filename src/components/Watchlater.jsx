import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext'

function Watchlater() {

  const userData = useContext(UserContext)

  const userId = userData.loggedUser.userId
  const token = userData.loggedUser.token

  const [watchlaterMovies, setWatchlaterMovies] = useState([])
  const [message, setMessage] = useState()

  useEffect(() => {

    fetch(`http://127.0.0.1:8000/moviezy/watchlist/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": "Bearer " + token
      }

    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)

          setWatchlaterMovies(data)

      })
      .catch((err) => {
        console.log(err)
      })


  }, [])

  console.log(watchlaterMovies)


  return (
    <section className='container'>

      <div className='favorite-section'>

        <div className='favorite-section-content-area'>
          <div className='favorite-section-content-area-head'>

            <h3>Watchlisted Movies</h3>

          </div>
          <div className='favorite-section-content-area-body'>

            {
              watchlaterMovies.status!='404'?(
              
                watchlaterMovies.map((movie, index) => {
                  return (

                    <div className='movie-card' key={index}>

                      <img className='movie-thumbnail' src={movie.image} alt="mac" />

                    </div>

                  )
                })
              ):null
  
            }


          </div>


        </div>

      </div>

    </section>
  )
}

export default Watchlater
