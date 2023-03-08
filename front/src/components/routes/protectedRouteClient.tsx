import { Navigate, Outlet } from "react-router-dom";
import React from "react";
const ProtectedRouteClient: React.FC = () => {
  if (sessionStorage.getItem("role") === "USER") {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRouteClient;
