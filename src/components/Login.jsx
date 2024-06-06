import React, { useEffect, useState,useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { UserContext } from '../Contexts/UserContext'

function Login() {


    const navigate=useNavigate()

    const loggedInData= useContext(UserContext)

    

    const [loginDetails,setloginDetails]=useState({
        email:'',
        password:''
    })

    const [message,setMessage]=useState({
        type:'invisible message',
        text:''
    })

    // to find err methods

    const [userntfound,setUserntfound]=useState()

    const [incorrectPass,setIncorrectPass]=useState()



   

    function handlingInput(event){

        setloginDetails((previousValue)=>{
            return {...previousValue,[event.target.name]:event.target.value}
        })
    }

    function handleSubmit(){

        

        fetch('http://127.0.0.1:8000/login',{
            method:'POST',
            body:JSON.stringify(loginDetails),
            headers:{
                "Content-Type":"application/json"
            },
            
        })
        .then((response)=>{

            if (response.status==404){
                setMessage({type:'error', text:'User not found'})
                setUserntfound('error-inp')
            }
            else if(response.status==401){

                setMessage({type:'error', text:'Incorrect Password'})
                setIncorrectPass('error-inp')

            }
            else if(response.status==207){

                return response.json()

            }
            setTimeout(()=>{
                setMessage({ type:'invisible message',text:''})
            },5000)
            
        })
        .then((data)=>{
            
            console.log(data)
            if(data.token!==undefined){

                localStorage.setItem('moviezy-user',JSON.stringify(data));

                loggedInData.setLoggedUser(data)

                navigate('/home');

            }
            
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }

  return (
    <section className='container height100vh'>

            <section className='Reg-Head'>
                <h1>Moviezy</h1>
            </section>
            <section className='reg-body log-body'>
                <h1 className='log-title'>Log in to Moviezy</h1>

            
                    <form className='main-form' action="">

                        <input onChange={handlingInput} className={`inp-form ${userntfound}`} type="email" name='email' value={loginDetails.email} placeholder='Email' required />
                        <input onChange={handlingInput} className={`inp-form ${incorrectPass}`} type="password" name='password' value={loginDetails.password} placeholder='Password' minLength={8} required />
                        <p className={message.type}>{message.text}</p>

                    </form>

                    <button onClick={handleSubmit} className='btn-form-log'>Log In</button>
                    <p className='form-ptag-log'>Don't have an account? <Link to={'/register'}>Sign up for Moviezy</Link></p>
                    <p className='form-ptag2'>Privacy Policy and Terms of Service apply.</p>

            </section>

        </section>
  )
}

export default Login
