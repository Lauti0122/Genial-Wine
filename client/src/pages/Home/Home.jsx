import React, { useState, useEffect, useRef } from 'react'
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, isLogged, postUser } from "../../redux/actions";


export  function Home() {


  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const [ loginInfo, setLoginInfo ] = useState({});

  useEffect(() => {
    dispatch(getUsers());
    onAuthStateChanged(auth, (user) => {
      if (user && user.displayName) {
        dispatch(isLogged(user ? true : false));
        let fullname = user.displayName.split(" ");
        setLoginInfo({
          name: fullname[0],
          lastname: fullname[1],
          email: user.email,
          photo: user.photoURL
        })
      } 
    })
   
  }, [])

  useEffect(() => {
    if (loginInfo.hasOwnProperty("name")) {
      const userFound = users?.find(u => u.email === loginInfo.email);
      if (!userFound) dispatch(postUser(loginInfo));
    }
  }, [loginInfo])
  

  return (
    <>
    </>
  )
}
