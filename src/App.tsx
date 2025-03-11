import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import Bicycles from "./pages/Public/Bicycles";
import HomePage from "./pages/Public/Bicycles";
import Login from "./pages/Guest/Login";
import Register from "./pages/Guest/Register";
//import Login from "./pages/Auth/Login";
//import Register from "./pages/Auth/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Trang chủ */}
        <Route path="/bicycles" element={<Bicycles />} /> {/* Trang xe đạp */}
        <Route path="/login" element={<Login />} /> {/* Trang đăng nhập */}
        <Route path="/register" element={<Register />} /> {/* Trang đăng ký */}
      </Routes>
    </Router>
  );
}

export default App;
