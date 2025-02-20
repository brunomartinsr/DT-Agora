import React from 'react'
import Header from '../components/Header.jsx'
import Main from '../components/Main.jsx'
import Footer from '../components/Footer.jsx'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const location = useLocation()
  const challenges = location.state?.challenges || []

  return (
    <div className='bg-gray-700 min-h-screen'>
      <Header/>
      <Main challenges={challenges}/>
      <Footer/>
    </div>
  )
}

export default Home