import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Guest/HomePage";
//import Login from "./pages/Auth/Login";
//import Register from "./pages/Auth/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
