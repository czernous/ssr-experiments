import React from 'react'
import { Link, Outlet, Route, Router, Routes } from 'react-router-dom'
import About from './pages/About'
import Home from './pages/Home'

const App:React.FC = () => (
    <Routes >
 
            <Route index element={<Home/>} />
            <Route path="about" element={<About />} />
     
    </Routes>
    
)




export default App