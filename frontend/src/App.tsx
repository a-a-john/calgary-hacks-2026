import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Mosaic from "./pages/Mosaic";
import Memory from "./pages/Memory";
import Login from "./pages/Login";
import './App.css'
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mosaic" element={<Mosaic />} />
        <Route path="/memory/:id" element={<Memory />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
