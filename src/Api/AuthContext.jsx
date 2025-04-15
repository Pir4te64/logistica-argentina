import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/Api/Api";

// Creamos el contexto de autenticación
export const AuthContext = createContext();

// Componente proveedor que envuelve la aplicación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); // Estado para cargar autenticación

  // Al montar el componente, verificamos si existen datos de autenticación en el localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    }
    if (storedToken && storedToken !== "undefined") {
      setToken(storedToken);
    }
    setAuthLoading(false); // Finalizamos la carga una vez leído el localStorage
  }, []);

  // Función para iniciar sesión
  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
  };

  // Función para cerrar sesión
  const logout = async () => {
    try {
      await axios.post(
        API_URL.LOGOUT,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.href = "/";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, authLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
