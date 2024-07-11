import React from 'react'
import Dashboard from './components/dashboard/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'
import EditCourse from './components/Edit/EditCourse'
import EditModule from './components/Edit/EditModule'
import EditTeachers from './components/Edit/EditTeachers'
import EditModuleData from './components/Edit/EditModuleData'
import EditWebinar from './components/Edit/EditWebinar'
import EditBlogs from './components/Edit/EditBlogs'


const App = () => {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/editcourse/:id' element={<EditCourse />} />
        <Route path='/editmodule/:id' element={<EditModule />} />
        <Route path='/editteacher/:id' element={<EditTeachers />} />
        <Route path='/editmoduledata/:id' element={<EditModuleData />} />
        <Route path='/webinar/:id' element={<EditWebinar />} />
        <Route path='/blogs/:id' element={<EditBlogs />} />


      </Routes>
    </BrowserRouter>
  )
}

export default App
