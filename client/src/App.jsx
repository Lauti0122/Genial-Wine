import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import { Home, About, NotFound, Wines } from './pages';
import {ResetPassword} from './components/Auth'
import { Login, Register, MyProfile } from "./pages/Auth";
import { NavBar } from './components/NavBar';
import { useLocation } from 'react-router-dom';
import { ProtectedRoute } from "./components/ProtectedRoute";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

export default function App() {

   const [logged, setLogged] = useState(false);

   useEffect(() => {
     onAuthStateChanged(auth, (user) => setLogged(user ? true : false));
   }, [])

  const location = useLocation();

  return (
    <>
      {!location.pathname.includes("/auth/") && <NavBar/>}
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/home" element={<Home/>} />
          <Route path="/auth/*" > 
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path='reset-password' element={<ResetPassword/>}/>
          </Route>
          <Route path='/wines' element={<Wines/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/my-profile' element={
            <ProtectedRoute 
              isAllowed={logged && logged}
					  >
              <MyProfile/>
					  </ProtectedRoute>
          } />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </>
      
  )
}

