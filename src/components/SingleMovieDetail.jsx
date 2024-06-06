import React, { useEffect } from 'react'
import { useState,useContext } from 'react'
import { MovieIdContext } from '../Contexts/MovieIdContext';
import Navbar from './Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faHeart, faStar } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../Contexts/UserContext';

function SingleMovieDetail() {

    const movieIdData= useContext(MovieIdContext)

    const userData=useContext(UserContext)
    

    const userId=userData.loggedUser.userId
    const movieID=movieIdData.movieId
    const token=userData.loggedUser.token


    const [watchIconColor, setWatchIconColor] = useState('colorWhite')
    const [favIconColor, setFavIconColor] = useState('colorWhite')


    const [movieDetails,setMovieDetails]=useState({
        title:'',
        image:'',
        description:'',
        genres:'',
        duration:'',
        releaseDate:'',
        language:'',
        moviezyRating:''

    })

    const favMovieDetails={
        movieId:movieID,
        userId:userId,
        title:movieDetails.title,
        image:movieDetails.image
    }
    // console.log(movieDetails.title)


    // console.log('singleMpage',movieIdData.movieId)

    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/movieDetail/${movieIdData.movieId}`,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            // console.log(data)
            if (data!=null){

                setMovieDetails((previousValue)=>{
                    
                    return{...previousValue,
                        title:data.title,
                        image:data.image,
                        description:data.description,
                        genres:data.genres,
                        duration:data.duration,
                        releaseDate:data.releaseDate,
                        language:data.language,
                        moviezyRating:data.moviezyRating

                    }
                })

            }
            
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    function mouseHoverBook() {

        setWatchIconColor('colorGreen')

    }
    function mouseOutBook() {

        setWatchIconColor('colorWhite')

    }

    function mouseHoverFav() {

        setFavIconColor('colorGreen')

    }
    function mouseOutFav() {

        setFavIconColor('colorWhite')

    }

    function onClickFav(){

        fetch('http://127.0.0.1:8000/movies/favorite',{
            method:'POST',
            body:JSON.stringify(favMovieDetails),
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+token
            }

        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })
        

    }

    function onClickWatch(){

        fetch('http://127.0.0.1:8000/moviezy/watchlist',{
            method:'POST',
            body:JSON.stringify(favMovieDetails),
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+token
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data)
        })
        .catch((err)=>{
            console.log(err)
        })

    }


    return (
        <section className='singlemovie-section'>




            <div className='singlemovie-section-bg'>

                <img className='singlemovie-section-bg-image' src={movieDetails.image} alt="mac" />

            </div>
            <div className='singlemovie-section-content-area'>
                <div className='singlemovie-nav-section'>

                    <Navbar />

                </div>
                <div className='singlemovie-section-image-detail-section-area'>
                    <div className='singlemovie-section-image-section'>

                        <div className='singlemovie-card'>

                            <img className='singlemovie-card-img' src={movieDetails.image} alt="mac" />


                        </div>

                    </div>
                    <div className='singlemovie-section-image-Details'>

                        <div className='details'>

                            <h1 className='movie-title-h1 colorWhite'>{movieDetails.title}</h1>
                            <p className='colorWhite'>{movieDetails.duration}</p>
                            <p className='colorWhite'>{movieDetails.genres}</p>
                            <p className='colorWhite'>Language: {movieDetails.language}</p>
                            <p className='colorWhite'>{movieDetails.releaseDate}</p>
                            <p className='colorWhite'>Moviezy Rating <FontAwesomeIcon icon={faStar} className='colorYellow' /> <FontAwesomeIcon icon={faStar} className='colorYellow' /></p>
                            <br />
                            <p className='colorWhite'>{movieDetails.description}</p>

                            <div className='movie-btn-section'>

                                <p onClick={onClickWatch} onMouseEnter={mouseHoverBook} onMouseOut={mouseOutBook} className='movie-btns colorWhite'><FontAwesomeIcon icon={faBookmark} className={watchIconColor} />Watchlist</p>
                                <p onClick={onClickFav} onMouseEnter={mouseHoverFav} onMouseOut={mouseOutFav} className='movie-btns colorWhite'><FontAwesomeIcon icon={faHeart} className={favIconColor} />Favorite</p>


                            </div>

                        </div>

                    </div>

                </div>




            </div>

        </section>
    )
}

export default SingleMovieDetail
