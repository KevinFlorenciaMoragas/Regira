import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login.jsx';
import Header from './components/Header.jsx';
import Index from './components/Index.jsx';
import Register from './components/Register.jsx';
import ProjectsList from './components/ProjectsList.jsx';
import NewIssue from './components/NewIssue.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import NewProject from './components/NewProject.jsx';
import Project from './components/Project.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Index />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/project/:id' element={<Project></Project>}></Route>
        <Route path='/projects' element={<ProjectsList />}></Route>
        <Route path='/newProject' element={<NewProject />}></Route>
        <Route path='/new-issue/:idProject' element={<NewIssue />}></Route>
      </Route>
    </Routes>

  </BrowserRouter>
)
