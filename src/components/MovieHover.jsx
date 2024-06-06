import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext'


function MovieHover(props) {

    const userData=useContext(UserContext)

    const userId=userData.loggedUser.userId
    const token=userData.loggedUser.token
    const movieDetails={
        movieId:props.data._id,
        userId:userData.loggedUser.userId,
        title:props.data.title,
        image:props.data.image
    }

    function click(){
        // console.log(userId)
        // console.log(props.data._id)
        // console.log(token)

        // console.log(movieDetails)

        fetch('http://127.0.0.1:8000/moviezy/watchlist',{
            method:'POST',
            body:JSON.stringify(movieDetails),
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
        <div  className='watchlater-btn-section'>

            <div onClick={click} className='watchlater-btn'>

                <p className='watchlater-btn-p'>Watch Later</p>

            </div>

        </div>
    )
}

export default MovieHover
