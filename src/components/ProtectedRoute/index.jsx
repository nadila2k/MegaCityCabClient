import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProtectedRoute = ({ role, children }) => {
  const { user } = useAuth();
  if (!user || user.roles !== role) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
};

export default ProtectedRoute;
