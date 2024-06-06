import React from 'react'
import Navbar from './Navbar'
import Banner from './Banner'
import Movies from './Movies'
import { useContext } from 'react'
import { SearchClickContext } from '../Contexts/SearchClickContext'


function Home() {

  const searchClickHome=useContext(SearchClickContext)

  // console.log(searchClickHome.searchClick)


  return (
    <section className='container'>

      <Navbar/>
      {searchClickHome.searchClick!=true?<Banner/>:null}
      <Movies/>

  
    </section>
  )
}

export default Home
