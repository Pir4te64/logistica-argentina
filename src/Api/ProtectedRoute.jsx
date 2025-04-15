// ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@/Api/AuthContext";

const ProtectedRoute = ({ children, allowedIds }) => {
  const { user, authLoading } = useContext(AuthContext);

  // Mientras se carga la autenticación, se muestra un mensaje (o spinner) y no se redirige.
  if (authLoading) {
    return <div>Cargando...</div>;
  }

  // Si no hay usuario o si el usuario no posee alguno de los roles permitidos, redirige a la raíz.
  if (
    !user ||
    (allowedIds && !user.roles.some((role) => allowedIds.includes(role.id)))
  ) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
