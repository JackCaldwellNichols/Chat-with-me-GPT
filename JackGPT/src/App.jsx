import { useContext, useState } from 'react'
import Home from './Pages/Home/Home.jsx'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Pages/Login/Login.jsx'
import Regsiter from './Pages/Register/Regsiter.jsx'
import { Context } from './Context/authContext.jsx'


function App() {

  const {user} = useContext(Context)

  return (

      <BrowserRouter>
      <Routes>
        <Route path='/login' element=  {<Login />}/>  
        <Route path='/register' element=  {<Regsiter />}/>  
        <Route path='/' element=  {user ? <Home /> : <Login />}/>
      </Routes>
        
      </BrowserRouter>
        
  )
}

export default App
