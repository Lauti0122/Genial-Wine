import './App.css';
import { Routes, Route} from 'react-router-dom';
import { Home, About, NotFound, Wines } from './pages';
import { Login, Register } from "./pages/Auth";
import { NavBar } from './components/NavBar';

export default function App() {

  return (
    
<>
    <NavBar/>
    <Routes>
      <Route index element={<Home/>}/>
      <Route path="/auth/*"> 
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

