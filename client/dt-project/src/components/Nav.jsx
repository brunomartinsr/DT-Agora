import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from  '../context/AuthContext.jsx'

const NavLinks = () => {
  const { user, logout } = useContext(AuthContext)

  return (
    <div className='flex space-x-6 text-yellow-500 pt-4'>
        {user ? (
            <>
              <NavLink to='/profile' className="hover:underline">Profile</NavLink>
              <button onClick={logout} className="hover:underline">
                Sair
              </button>
            </>
          ):(
            <>
              <NavLink to='/login' className="hover:underline">Login</NavLink> 
            </>
          )  
       }
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