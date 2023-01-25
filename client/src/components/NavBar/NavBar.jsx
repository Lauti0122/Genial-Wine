import React,{useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import {Container} from './NavBarStyles';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../../firebase/index'

export function NavBar() {

  const [logged, setLogged] = useState(false);

  useEffect(() => {
     onAuthStateChanged(auth, (user) => setLogged(user ? true : false));
  }, [])

  return (
    <nav>
      <Container >
        <NavLink to='/wines'>Wines</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/bejudge'>Be Judge</NavLink>
          {logged ? "Iniciaste" : <NavLink to='/auth/login'>Sign In</NavLink> }
        
      </Container>
    </nav>
  )
}
