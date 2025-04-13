// ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/Api/AuthContext";

const ProtectedRoute = ({ children, allowedIds }) => {
  const { user } = useContext(AuthContext);

  // Si no hay usuario o si no se encuentra ningún rol del usuario que esté en allowedIds, redirige
  if (
    !user ||
    (allowedIds && !user.roles.some((role) => allowedIds.includes(role.id)))
  ) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
