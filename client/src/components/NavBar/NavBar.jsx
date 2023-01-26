import React,{useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import {Container} from "./NavBarStyles";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../../firebase/index";
import { useSelector, useDispatch } from "react-redux";
import { getUserByEmail } from "../../redux/actions";
import { AccountMenu } from "./AccountMenu/AccountMenu";

export function NavBar() {

  const [logged, setLogged] = useState(false);
  const [emailUser, setEmailUser] = useState("");

  const dispatch = useDispatch()
  const user = useSelector(state => state.user);

  useEffect(() => {
     onAuthStateChanged(auth, (user) => {
      setLogged(user ? true : false)
      setEmailUser(user.email)
    });
  }, [])

  useEffect(() => {
    if (emailUser !== "") dispatch(getUserByEmail(emailUser))
  }, [emailUser])
  


  return (
    <nav>
      <Container >
        <NavLink to='/wines'>Wines</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/bejudge'>Be Judge</NavLink>
        {/* {logged ? 
          <>
            <span>{user.name} {user.lastname}</span>
            <img src={user.photo} alt="avatar" /> 
          </>
          : <NavLink to="/auth/login">Sign In</NavLink>
        } */}
        {logged ? <AccountMenu/> :  <NavLink to="/auth/login">Sign In</NavLink>}
      </Container>
    </nav>
  )
}
