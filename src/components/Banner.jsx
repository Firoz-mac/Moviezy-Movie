import React, { useEffect, useState } from 'react'

function Banner() {

    const [img,setImg]=useState([])

    

    useEffect(()=>{

        fetch('http://127.0.0.1:8000/moviezy/banner/get',{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
        })
        .then((response)=>response.json())
        .then((data)=>{

            let  Ndata=data
            setImg(Ndata)
            // console.log(Ndata)
        })
        .catch((err)=>{

            console.log(err)

        })

    },[])

    

    return (
    <section className='carousal-container'>
        <div className='carousal'>

            <div className='carousal-item'>

                {
                    img.map((item,index)=>{
                        return(

                            // console.log(item.image)
                            <div key={index}>
                                <img className='carousal-img' src={item.image} alt="mac" />
                                <div className='shade-bg'>

                                    <div className='banner-content'>

                                        <h1 className='h1-banner'>Free Movies to Watch, <br/> Anytime Anywhere.</h1>
                                        <p className='p-banner'>The search is over! Let Moviezy help you find the perfect <br/> movie to watch tonight for free.</p>

                                    </div>

                                </div>
                            </div>

                            
                            

                        )
                    })
                }


            </div>

        </div>

    </section>

    )
}

export default Banner
