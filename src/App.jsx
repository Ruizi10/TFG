import {BrowserRouter, Router, Routes, Route, Link, } from 'react-router-dom'

import Form from "./components/Form/Form";
import "./components/Form/Form.css";

import Navbar from "./components/Navbar/Navbar"
import "./components/Navbar/Navbar.css"

import './App.css'



export default function App() {
  return (
    <BrowserRouter>        
      <Navbar/>
      <Routes>
        <Route path='/' />
        <Route path='/Formulario' element={<Form/>} />
        {/*<Route path='/News' element={<News/>} />*/}
      </Routes>
    </BrowserRouter>
    
  );
}


