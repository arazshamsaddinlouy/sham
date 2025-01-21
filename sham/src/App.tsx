import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./_layout";
import Login from "./pages/login";
import LoginOtp from "./pages/login/otp";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard/indext";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/otp" element={<LoginOtp />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
