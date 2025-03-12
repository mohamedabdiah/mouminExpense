import React from 'react'
import {BrowserRouter as Router, Routes,Route,Navigate, replace} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProjectedRoute  from './components/ProjectedRoute';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/Home' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/dashboard' element={
         <ProjectedRoute>
           <Dashboard />
         </ProjectedRoute>
          }/>
        <Route path='/' element={<Navigate to='/home' replace />}/>
      </Routes>
    </Router>
  )
}

export default App