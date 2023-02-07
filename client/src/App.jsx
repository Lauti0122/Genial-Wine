import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import { Home, About, NotFound, Wines, WineDetail } from './pages';
import {ResetPassword} from './components/Auth'
import { Login, Register, MyProfile } from "./pages/Auth";
import { NavBar } from './components/NavBar';
import { useLocation } from 'react-router-dom';
import { ProtectedRoute } from "./components/ProtectedRoute";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Cart from './components/Cart/Cart';
import Payment from './components/Payment/Payment';
import {useDispatch, useSelector} from 'react-redux';
import { isLogged } from './redux/actions'


export default function App() {

  //  const [logged, setLogged] = useState(false);
  const dispatch = useDispatch();

  const logged = useSelector(state => state.isLogged) 

   useEffect(() => {
     onAuthStateChanged(auth, (user) => dispatch(isLogged(user ? true : false)));

   }, [])

  const location = useLocation();

  return (
    <>
      {!location.pathname.includes("/auth/") && <NavBar/>}
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/home" element={<Home/>} />
          <Route path="/auth/*" > 
            <Route path="login" element={
              <ProtectedRoute 
                isAllowed={logged}
                redirectTo="/"
              >
                <Login />
              </ProtectedRoute>
            }  />
            <Route path="register" element={<Register />} />
            <Route path='reset-password' element={<ResetPassword/>}/>
          </Route>
          <Route path='/wines' element={<Wines/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/my-profile' element={
            <ProtectedRoute 
              isAllowed={logged}
					  >
              <MyProfile/>
					  </ProtectedRoute>
          } />
          <Route path='/wine/:id' element={<WineDetail/>}/>
          <Route path="/payment" element={<Payment />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </>
      
  )
}

