import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import { Home, About, NotFound, Wines } from './pages';
import { Login, Register } from "./pages/Auth";
import { NavBar } from './components/NavBar';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from './firebase/index'

export default function App() {

  
  const [logged, setLogged] = useState(false);

  useEffect(() => {
     onAuthStateChanged(auth, (user) => setLogged(user ? true : false));
  }, [])


  return (
    
<>
   {/*  {logged  && <NavBar/>  } */}
   <NavBar/>
    <Routes>
      <Route index element={<Home/>}/>
      <Route path="/auth/*" > 
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path='/wines' element={<Wines/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='*' element={<NotFound/>}/>
     </Routes>
  </>
   
  )
}

