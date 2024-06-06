import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Register() {

    const navigate=useNavigate()


    const [regDetails,setRegDetails]=useState({
        userName:'',
        email:'',
        password:'',
        age:''
    })

    const [message,setMessage]=useState({
        type:'invisible message',
        text:''
    })
    const [userNameExist,setUserNameExist]=useState()
    const [emailRegisterd,setemailRegisterd]=useState()


    function handleInput(event){

        setRegDetails((previous)=>{

            return {...previous,[event.target.name]:event.target.value}

        })

    }



    function handleSubmit(){

        // console.log(regDetails)

        fetch('http://127.0.0.1:8000/register',{
            method:'POST',
            body:JSON.stringify(regDetails),
            headers:{
                "Content-Type":"application/json"
            },
            
        })
        .then((response)=>{

            if(response.status==403){

                setMessage({type:'error', text:'User Name Already Exist'})
                setUserNameExist('error-inp')

            }
            else if (response.status==409){

                setMessage({type:'error', text:'Email Id Already Registerd'})
                setemailRegisterd('error-inp')

            }
            else if (response.status==200){

                return response.json()

            }

            setTimeout(()=>{
                setMessage({ type:'invisible message',text:''})
            },5000)

        })
        .then((data)=>{
            // console.log(data)
            if (data.message=='Registration Successfull'){

                navigate('/login')
                
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
            <section className='reg-body'>
                <h1 className='reg-title'>Sign up to start <br /> Watching</h1>

            
                    <form className='main-form' action="">

                        <input onChange={handleInput} className={`inp-form ${userNameExist}`} type="text"  placeholder='User Name' name='userName' required />
                        <input onChange={handleInput} className={`inp-form ${emailRegisterd}`} type="email"  placeholder='Email' name='email' required />
                        <input onChange={handleInput} className='inp-form' type="password"  placeholder='Password' name='password' minLength={8} required />
                        <input onChange={handleInput} className='inp-form' type="number"  placeholder='Age' name='age' required />
                        <p className={message.type}>{message.text}</p>

                    </form>

                    <button onClick={handleSubmit} className='btn-form'>Create Account</button>
                    <p className='form-ptag'>Already have an account? <Link to={'/login'}>Log in here.</Link></p>
                    <p className='form-ptag2'>Privacy Policy and Terms of Service apply.</p>

            </section>

        </section>
    )
}

export default Register
