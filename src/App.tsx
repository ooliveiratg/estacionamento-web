import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Exit from "./pages/Exit"
import Entry from "./pages/Entry"
import VehicleListing from "./pages/Listing"

export default function App (){
    return(

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/entry" element={<Entry />} />
        <Route path="/exit" element={<Exit />} />
        <Route path="/listing" element={<VehicleListing />} />
      </Routes>

    )
}