import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import LoginForm from './components/LoginForm.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm />}/>
        <Route path='/dashboard' element={<App />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
