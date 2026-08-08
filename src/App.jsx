import { useState } from 'react'
import './App.css'
import Layout from './layout'
import { Routes, Route } from "react-router-dom";

import { Button, Input, Logo } from './components'
import { Footer, Home, Login, Navbar, Logout, Signup } from "./pages"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  )
}

export default App
