import loadable from '@loadable/component'
import React from 'react'
import { Link, Outlet, Route, Router, Routes } from 'react-router-dom'


const Home  = loadable(() => import('./pages/Home'))
const About = loadable(() => import('./pages/About'))


const App:React.FC = () => (
    <Routes >
 
            <Route path="/" element={<Home/>} />
            <Route path="about" element={<About />} />
     
    </Routes>
    
)




export default App