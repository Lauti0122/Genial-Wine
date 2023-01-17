import React from 'react'
import {NavLink} from 'react-router-dom'

export  function NavBar() {
  return (
    <nav>
        <div>
        <NavLink to='/wines'>Wines</NavLink>
        <NavLink to='/about'>About</NavLink>
        </div>
    </nav>
  )
}
