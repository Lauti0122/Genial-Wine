import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../firebase';
import { useSelector, useDispatch } from "react-redux";
import { getUserByEmail, clearUser } from "../../../redux/actions/index";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export  function AccountMenu() {

  const navigate = useNavigate();
  const [emailUser, setEmailUser] = useState("");
  const [userGoogle, setUserGoogle]= useState({name:"", photo:""})

  const dispatch = useDispatch()
  const user = useSelector(state => state.user);

  useEffect(() => {
     onAuthStateChanged(auth, (user) => {
      if(user.hasOwnProperty("photoURL")){
        const name = user.displayName.split(" ")[0]
        setUserGoogle({
          name,
          photo: user.photoURL
        })
      }
      setEmailUser(user.email)
    });
  }, [])

  useEffect(() => {
    if (emailUser !== "") dispatch(getUserByEmail(emailUser))
  }, [])
  



  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    const logout = async () => {
      await signOut(auth);
      dispatch(clearUser())
      navigate("/")

    }
  
  return (
    <React.Fragment>


      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        
        <Typography sx={{ minWidth: 100 }}>Hola, {user.name || userGoogle.name}</Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}><img style={{ width:"32px", height:"32px" }} src={user.photo || userGoogle.photo} alt="avatar" /></Avatar> 
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link style={{ color: "black" }} to={"/my-profile"}>
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        </Link>
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem> */}
        <Divider />

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>

        
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}