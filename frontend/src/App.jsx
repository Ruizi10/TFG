import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Form from "./components/Form/Form";

import Dashboard from "./components/Dashboard/Dashboard";

import News from "./components/News/News";

import Home from "./components/Home/Home";


import Navbar from "./components/Navbar/Navbar"

import Footer from './components/Footer/Footer';

import './App.css'



export default function App() {
  return (
    <BrowserRouter>        
      <Navbar/>
      <main className='main-content'>
        <Routes>
          {/* <Route path='/' /> */}
          <Route path='/' element={<Home/>}/>
          <Route path='/formulario' element={<Form/>} />
          <Route path='/news' element={<News/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}


