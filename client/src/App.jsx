import './App.css';
import { Routes, Route} from 'react-router-dom';
import { Home, About, NotFound, Wines, WineDetail } from './pages';
import {ResetPassword} from './components/Auth'
import { Login, Register, MyProfile } from "./pages/Auth";
import { NavBar } from './components/NavBar';
import { useLocation } from 'react-router-dom';


export default function App() {

  const location = useLocation();

  return (
    <>
      {!location.pathname.includes("/auth/") && <NavBar/>}
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/auth/*" > 
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path='reset-password' element={<ResetPassword/>}/>
          </Route>
          <Route path='/wines' element={<Wines/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/my-profile' element={<MyProfile/>}/>
          <Route path='/wine/:id' element={<WineDetail/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </>
      
  )
}

