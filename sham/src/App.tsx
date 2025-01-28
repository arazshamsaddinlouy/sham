import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./_layout";
import Login from "./pages/login";
import LoginOtp from "./pages/login/otp";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard/indext";
import fa_IR from "antd/es/locale/fa_IR";
import { ConfigProvider } from "antd";
import RequestPrice from "./pages/dashboard/request-price";
import MyRequests from "./pages/dashboard/my-requests";
function App() {
  return (
    <ConfigProvider locale={fa_IR} direction="rtl">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/otp" element={<LoginOtp />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="request-price" element={<RequestPrice />} />
              <Route path="my-requests" element={<MyRequests />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
