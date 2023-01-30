import React,{useEffect, useState, useRef} from "react";
import { NavLink } from "react-router-dom";
import {Container} from "./NavBarStyles";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../../firebase/index";
import { useSelector, useDispatch } from "react-redux";
import { getUserByEmail } from "../../redux/actions";
import { AccountMenu } from "./AccountMenu/AccountMenu";
import { Link } from "react-router-dom";
import logo from '../../assets/genial.wine.png'
import audio from '../../assets/music.mp3';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';


export function NavBar() {

  const isLogged = useSelector(state => state.isLogged);
  const refAudio = useRef();
  const [playMusic, setPlayMusic] = useState(false)
  const [emailUser, setEmailUser] = useState("");

  const dispatch = useDispatch()

  useEffect(() => {
     onAuthStateChanged(auth, (user) => {
        if (user) {
          setEmailUser(user.email)
        }
    });
  }, [])

  useEffect(() => {
    if (emailUser !== "") dispatch(getUserByEmail(emailUser))
  }, [emailUser])
  
  const handlePlay = () =>{
    refAudio.current.play()
    setPlayMusic(true)
  }

  const handlePause = () =>{
    refAudio.current.pause()
    setPlayMusic(false)
  }

  return (
    <nav>
      <Container >
        <Link to={"/"}>
        <img src={logo} alt="" />
        </Link>
        <NavLink to='/wines'>Wines</NavLink>
        <NavLink to='/about'>About</NavLink>
        <NavLink to='/bejudge'>Be Judge</NavLink>
        {playMusic ? <MusicNoteIcon onClick={handlePause}/> :  <MusicOffIcon onClick={handlePlay} /> }
        <audio  id="music" loop ref={refAudio}  >
          <source src={audio} type="audio/mpeg" />
        </audio>
        {isLogged ? <AccountMenu/> :  <NavLink to="/auth/login">Sign In</NavLink>}
      </Container>
    </nav>
  )
}
