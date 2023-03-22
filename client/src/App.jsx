import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { LoginPage }from "./pages/loginPage";
import {BrowserRouter , Routes , Route} from 'react-router-dom'

function App() {


  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
     
     <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage/>} />
            
        </Routes>
      </BrowserRouter>
    </div>
  </div>
 
  )
}

export default App
