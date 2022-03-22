import loadable from '@loadable/component'
import React from 'react'
import { Link, Outlet, Route, Router, Routes } from 'react-router-dom'


const Home  = loadable(() => import('./pages/Home'))
const About = loadable(() => import('./pages/About'))


const App:React.FC = () => (
    

        
        <>
            <ul>
                <li>
                    <Link to={'/'}>Home</Link>
                </li>
                <li>
                    <Link to={'/about'}>About</Link>
                </li>
            </ul>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </>
)


export default App