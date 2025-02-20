import React from 'react'
import '../index.css'
import Logo from './Logo'
import Nav from './Nav'

const Header = () => {
  return (
    <header className="bg-gray-800 mx-auto flex w-full items-center justify-between p-8"> 
        <Logo/>
        <Nav/>
    </header>
  )
}

export default Header