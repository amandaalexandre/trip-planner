import React from 'react'
import { Router, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import AboutMe from './pages/AboutMe'
import Credits from './pages/Credits'

function routes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' index element={<Home/>} />
            <Route path='/about-me' element={<AboutMe/>}/>
            <Route path='/credits' element={<Credits/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default routes