import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import Register from './views/Register/Register'
import MyAppointments from './views/MyAppointments/MyAppointments'
import Navbar from './components/Navbar/Navbar'
import NewAppointment from './views/NewAppointment/NewAppointment'

function App() {


  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/" exact element={<Home />} />
        <Route path="/appointments" exact element={<MyAppointments />} />
        <Route path="/new-appointment" exact element={<NewAppointment />} />
      </Routes>
    </div>
  )
}

export default App
