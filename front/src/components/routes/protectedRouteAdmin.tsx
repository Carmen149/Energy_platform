import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteAdmin: React.FC = () => {
  if (sessionStorage.getItem("role") === "ADMIN") {
    return <Outlet />;
  }
  if (sessionStorage.getItem("role") === "USER") {
    return <Navigate to="/home" />;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRouteAdmin;
