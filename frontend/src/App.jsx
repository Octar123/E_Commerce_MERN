import { useState } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddProduct from './pages/AddProduct'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/add-product' element={<AddProduct/>} />
      </Routes>
    </Router>
  )
}

export default App
