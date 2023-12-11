import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Login } from '../pages/Login'
import Favrouite from '../pages/Favrouite'
import PrivateRoute from './PrivateRouter'
import { Trending } from '../component/Movies/Trending/Trending'
import { Flims } from '../component/Movies/Flims/Flims'
import Search from '../component/Movies/Search/Search'
import Series from '../component/Movies/Series/Series'

export default function Allroutes() {
  return (
    <div>
      <Routes>
        
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Trending/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/series' element={<Series/>}/>
          <Route path='/flim' element={<Flims/>}/>
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
