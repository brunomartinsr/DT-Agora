import React from 'react';
import Questions from "./pages/Questions"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Challenge from './pages/Challenge';
import Login from './pages/login';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Questions/>} />
          <Route path='/home' element = {<Home/>} />
          <Route path="/challenge/:id" element={<Challenge/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
