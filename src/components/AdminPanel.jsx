import React from 'react'
import { useState } from 'react'

function AdminPanel() {

    const [message,setMessage]=useState({
        type:'invisible message',
        text:''
    })

    const[movieDetails,setMovieDetails]=useState({
        title:'',
        image:'',
        description:'',
        genres:'',
        duration:'',
        releaseDate:'',
        language:'',
        moviezyRatingL:''
    })


    function handleInput(event){

        setMovieDetails((previous)=>{
            return{...previous,[event.target.name]:event.target.value}
        })

        

    }

    function onSubmit(){

        // console.log(movieDetails)
        fetch('http://127.0.0.1:8000/admin',{
            method:'POST',
            body:JSON.stringify(movieDetails),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            // console.log(data)
            setMessage({type:'visible-msg', text:data.message})
        })
        .catch((err)=>{
            console.log(err)
        })
        setTimeout(()=>{
            setMessage({ type:'invisible message',text:''})
        },5000)
    }



  return (
    <section className='admin-section'>

        <div className='admin-form-section'>

            <div className='admin-form'>
                <div className='admin-form-head'>

                    <h3>Add Movie</h3>
                    <p className={message.type}>{message.text}</p>

                </div>
                <div className='admin-form-content'>

                    <input onChange={handleInput} className='admin-form-inp' type="text" placeholder='Title' name="title" id="" />
                    <input onChange={handleInput}  className='admin-form-inp' type="text" placeholder='image URL' name="image" id="" />
                    <input onChange={handleInput} className='admin-form-inp' type="text" placeholder='Description' name="description" id="" />
                    <input onChange={handleInput} className='admin-form-inp' type="text" placeholder='Genres' name="genres" id="" />
                    <input onChange={handleInput} className='admin-form-inp' type="text" placeholder='Duration' name="duration" id="" />
                    <input onChange={handleInput} className='admin-form-inp' type="text" placeholder='Release Date' name="releaseDate" id="" />
                    <input onChange={handleInput} className='admin-form-inp' type="text" placeholder='Language' name="language" id="" />
                    <input onChange={handleInput} className='admin-form-inp' type="text" placeholder='Moviezy Rating' name="moviezyRating" id="" />

                    <button onClick={onSubmit} className='admin-form-inp-btn'>Save</button>

                </div>
            </div>

        </div>

    </section>
  )
}

export default AdminPanel
