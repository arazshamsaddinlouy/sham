import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./_layout";
import Login from "./pages/login";
import LoginOtp from "./pages/login/otp";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import fa_IR from "antd/es/locale/fa_IR";
import { ConfigProvider, notification } from "antd";
import RequestPrice from "./pages/dashboard/request-price";
import MyRequests from "./pages/dashboard/my-requests";
import Responses from "./pages/dashboard/responses";
import DashboardSales from "./pages/dashboard/sales";
import DashboardTrades from "./pages/dashboard/trade";
import CustomerRequests from "./pages/dashboard/customer-request";
import Branches from "./pages/dashboard/branches";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import ProtectedRoute from "./components/protected-route";
import EditProfile from "./pages/dashboard/edit-profile";
import Admin from "./pages/admin/page";
import SellerPage from "./pages/seller";
import ScrollToTop from "./components/scroll-to-top";

export const ShamContext = createContext({ name: "ShamApp" });
function App() {
  const [api, contextHolder] = notification.useNotification();
  const [notif, setNotif] = useState<{
    type: "success" | "error" | "info" | "warning";
    description: string;
  }>();
  const openNotification = useCallback(
    (type: "success" | "error" | "info" | "warning", description: string) => {
      api[type]({
        message:
          type === "success"
            ? "موفق"
            : type === "error"
            ? "خطا"
            : type === "info"
            ? "اطلاع"
            : type === "warning"
            ? "اخطار"
            : "",
        description: description,
      });
    },
    [notif]
  );

  const contextValue = useMemo(
    () => ({
      name: "ShamApp",
      setNotif: setNotif,
    }),
    []
  );

  useEffect(() => {
    if (notif && notif.type && notif.type.length > 0) {
      openNotification(notif.type, notif.description);
    }
  }, [notif]);

  return (
    <ConfigProvider locale={fa_IR} direction="rtl">
      <ShamContext.Provider value={contextValue}>
        {contextHolder}
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/seller" element={<SellerPage />} />
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login/otp" element={<LoginOtp />} />
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
                <Route path="request-price" element={<RequestPrice />} />
                <Route path="my-requests" element={<MyRequests />} />
                <Route path="responses/:id" element={<Responses />} />
                <Route path="sales" element={<DashboardSales />} />
                <Route path="trades" element={<DashboardTrades />} />
                <Route path="profile/edit" element={<EditProfile />} />
                <Route path="customer-request" element={<CustomerRequests />} />
                <Route path="branches" element={<Branches />} />
              </Route>

              <Route path="admin" element={<Admin />} />
            </Route>
          </Routes>
        </Router>
      </ShamContext.Provider>
    </ConfigProvider>
  );
}

export default App;
