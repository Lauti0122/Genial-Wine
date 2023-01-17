import './App.css'
import { Routes, Route} from 'react-router-dom'
import {Home, About, NotFound, Wines} from './pages'
import {NavBar} from './components/NavBar'

export default function App() {

  return (
    
<>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/wines' element={<Wines/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='*' element={<NotFound/>}/>
     </Routes>
  </>
   
  )
}

