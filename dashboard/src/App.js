import React from 'react'
import Dashboard from './components/dashboard/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'
import EditCourse from './components/Edit/EditCourse'
import EditModule from './components/Edit/EditModule'
import EditTeachers from './components/Edit/EditTeachers'


const App = () => {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/editcourse/:id' element={<EditCourse />} />
        <Route path='/editmodule/:id' element={<EditModule />} />
        <Route path='/editteacher/:id' element={<EditTeachers />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
