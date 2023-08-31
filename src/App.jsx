import { Router, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
/* import Home from './pages/Home'
import AboutMe from './pages/AboutMe'
import Credits from './pages/Credits' */
import Navbar from './components/Navbar'
import Main from './components/Main'
import Footer from './components/Footer'

function App() {
  return (
    <>
    <Navbar/>
      <Main/>
      <Footer/>
{/*     <BrowserRouter>
        <Routes>
            <Route path='/' index element={<Home/>} />
            <Route path='/about-me' element={<AboutMe/>}/>
            <Route path='/credits' element={<Credits/>}/>
        </Routes>
    </BrowserRouter> */}
    </>
  )
}

export default App
