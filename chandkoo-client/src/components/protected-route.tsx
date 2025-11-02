// ProtectedRoute.tsx
import { useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShamContext } from "../App";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const value: any = useContext(ShamContext);
  const navigate = useNavigate();
  const handleRedirect = useCallback(() => {
    value.setNotif({
      type: "error",
      description: "جهت استعلام قیمت ابتدا وارد سایت شوید!",
    });
    // Redirect to login if no token found
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      handleRedirect();
      navigate("/login");
      return;
    }
  }, []);

  // Render the protected component if token exists
  return children;
};

export default ProtectedRoute;
