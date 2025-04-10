// ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/Api/AuthContext";

const ProtectedRoute = ({ children, allowedIds }) => {
  const { user } = useContext(AuthContext);

  // Si no hay usuario o el id del usuario no está en la lista de permitidos, redirige
  if (!user || (allowedIds && !allowedIds.includes(user.id))) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
