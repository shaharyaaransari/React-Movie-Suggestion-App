import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepages from '../pages/Homepages'
import { Login } from '../pages/Login'
import Favrouite from '../pages/Favrouite'
import PrivateRoute from './PrivateRouter'

export default function Allroutes() {
  return (
    <div>
      <Routes>
          <Route path='/' element={<Homepages/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route
          path="/favrouite"
          element={
            <PrivateRoute>
             <Favrouite/>
            </PrivateRoute>
          }
        />
          
        </Routes>  
    </div>

  )
}
