import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Bicycles from "./pages/Public/Bicycles";
import Login from "./pages/Public/Login";
import Register from "./pages/Guest/Register";
import About from "./pages/Public/About";
import Home from "./pages/Public/Home";
import Services from "./pages/Public/Services";
import Accessories from "./pages/Public/Accessories";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/services" element={<Services />} />
        <Route path="/bicycles" element={<Bicycles />} /> 
        <Route path="/accessories" element={<Accessories />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/about" element={<About />} /> 
      </Routes>
    </Router>
  );
}

export default App;
