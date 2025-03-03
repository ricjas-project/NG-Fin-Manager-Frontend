import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import CONFIG from "../config";

const ProtectedRoute = ({ children, allowedRoles = ["user", "admin"] }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    const verifySession = async () => {
      try {
        await axios.get(`${CONFIG.API_URL}/api/session-check`, {
          withCredentials: true
        });
      } catch (error) {
        localStorage.clear();
        window.location.href = "/login";
      }
    };
    
    if (token) verifySession();
  }, [token]);

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;