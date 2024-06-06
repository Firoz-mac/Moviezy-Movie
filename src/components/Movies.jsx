import React, { useEffect, useState,useContext } from 'react'
import { MovieIdContext } from '../Contexts/MovieIdContext';
import MovieHover from './MovieHover'
import { useNavigate } from "react-router-dom";
import { SearchMovieContext } from '../Contexts/SearchMovieContext';



function Movies() {

    const [movies, setMovies] = useState([])
    const [hover,setHover]=useState()

    const searchMovieData=useContext(SearchMovieContext)

    const [hoverIndex,setHoverIndex] = useState(null)

    const movieIdData= useContext(MovieIdContext)

    const navigate=useNavigate()

    const searchitem=searchMovieData.searchMovie
    // console.log(searchitem)





    useEffect(() => {

        fetch('http://127.0.0.1:8000/movies', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setMovies(data)
                // console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })

    },[])
    

  function handleMouseHover(index){
    setHover(true)
    setHoverIndex(index)
    

  }
  function handleMouseOut(){
    setHover(false)
    setHoverIndex(null)
    
  }

  function showMovieDetails(){


    navigate('/movieDetail')
    
  }




    return (
        <section className='movies-container'>

            <div  className='movies'>

                            {/* <div className='movie-card'>
                                <img className='movie-thumbnail' src='src/assets/1.jpg' alt="mac" />
                                
                            </div> */}

                {

                    searchitem!=null?(

                        searchitem.map((movie, index) => {
                        return (

                            <div className='movie-card' onMouseLeave={handleMouseOut} onClick={()=>{

                                if(movie._id!=null){
                                    movieIdData.setMovieId(movie._id)
                                    navigate('/movieDetail')
                                }

                            }} key={movie._id}>
                                <img onMouseEnter={(()=>{handleMouseHover(movie._id)})} className='movie-thumbnail' src={movie.image} alt="mac" />
                                {hoverIndex === movie._id && <MovieHover/>}
                                
                            </div>

                            )
                        })
                        
                    ):(
                    
                        movies.map((movie, index) => {
                            return (
    
                                <div className='movie-card' onMouseLeave={handleMouseOut} onClick={()=>{
    
                                    if(movie._id!=null){
                                        movieIdData.setMovieId(movie._id)
                                        navigate('/movieDetail')
                                    }
    
                                }} key={movie._id}>
                                    <img onMouseEnter={(()=>{handleMouseHover(movie._id)})} className='movie-thumbnail' src={movie.image} alt="mac" />
                                    {hoverIndex === movie._id && <MovieHover data={movie} />}
                                    
                                </div>
    
                            )
                        })
                    )
            

                }





            </div>

        </section>
    )
}

export default Movies
