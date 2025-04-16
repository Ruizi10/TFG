import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Form from "./components/Form/Form";
import "./components/Form/Form.css";

import Dashboard from "./components/Dashboard/Dashboard";
// import "./components/Dashboard/Dashboard.css";

import Navbar from "./components/Navbar/Navbar"
import "./components/Navbar/Navbar.css"

import Footer from './components/Footer/Footer';

import './App.css'



export default function App() {
  return (
    <BrowserRouter>        
      <Navbar/>
      <main className='main-content'>
        <Routes>
          {/* <Route path='/' /> */}
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/formulario' element={<Form/>} />
          {/*<Route path='/News' element={<News/>} />*/}
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}


