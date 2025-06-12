import { API_URL } from "@/Api/Api";
import axios from "axios";
import { useState, useEffect } from "react";


const useContactPhones = () => {
    // Estados generales
    const [data, setData] = useState(null); // Respuesta de la API
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Estado para errores
    
    const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(API_URL.NUMEROS_SOPORTE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.data.length) return setData([{
        id: '+58 424 123 4567',
        nombre: '+58 424 123 4567'
      }]);
      const list = response.data.map(num => ({
        id: num,
        nombre: num
      }));
      setData(list);
    } catch (err) {
      console.error("Error al obtener los datos:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
        fetchData();
    }, []);
    
    return { data, loading, error };
}

export default useContactPhones;
