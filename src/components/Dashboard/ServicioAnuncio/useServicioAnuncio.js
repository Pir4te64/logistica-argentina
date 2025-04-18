// src/hooks/useServicioAnuncio.js (o donde lo tengas)
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_URL } from "@/Api/Api";

export const useServicioAnuncio = () => {
  const [servicios, setServicios]   = useState([]);
  const [loading,   setLoading]     = useState(true);
  const [error,     setError]       = useState(null);

  // 🔁 función reutilizable
  const fetchServicios = useCallback(async () => {
    setLoading(true);
    try {
      const token   = localStorage.getItem("token");
      const res     = await axios.get(API_URL.SERVICIO_ANUNCIO, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServicios(res.data);
    } catch (err) {
      console.error("Error cargando servicios:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🚀 llamada inicial
  useEffect(() => {
    fetchServicios();
  }, [fetchServicios]);

  // devolvemos refetch
  return { servicios, loading, error, refetch: fetchServicios };
};
