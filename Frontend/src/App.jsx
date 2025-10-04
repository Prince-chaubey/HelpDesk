import React from 'react'
import Navbar from './Layout/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Auth/SignUp"
import Login from './Auth/Login';
import Dashboard from './Dashboard/Dashboard';
import CreateTicket from './CreateTicket/CreateTicket';
import Profile from './Profile/Profile';
import Footer from './Layout/Footer/Footer';
import HomePage from './Home/Home';
const App = () => {
  return (
    <Router>  
    <Navbar/>
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/createticket' element={<CreateTicket/>}/>
    <Route path='/profile' element={<Profile/>}/>
   
    </Routes>
    <Footer/>
    </Router>
  )
  
}

export default App