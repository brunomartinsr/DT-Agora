import React from 'react'
import { NavLink } from 'react-router-dom'

const NavLinks = () => {
  return (
    <div className='flex space-x-6 text-yellow-500 pt-4'>
        <NavLink to='/sobre' className="hover:underline">Sobre</NavLink>
        <NavLink to='/conta' className="hover:underline">Conta</NavLink>
    </div>
)
}

const Nav = () => {
  return (
    <nav className='w-1/3'>
        <div className='flex justify-center'>
            <NavLinks/>
        </div>
    </nav>
  )
}

export default Nav