import loadable from '@loadable/component'
import React from 'react'
import { Link, Outlet, Route, Router, Routes } from 'react-router-dom'
import routes from './routes'
import Home from './pages/Home'


const App = () => (
    

        
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
            
     
      {routes.map(({ ...routeProps }) => {
        const C = () => <routeProps.element/>
        return (
          <Route key={routeProps.path} path={routeProps.path} element={<C/> }/>
        )
      })}
          </Routes>
        </>
)


export default App