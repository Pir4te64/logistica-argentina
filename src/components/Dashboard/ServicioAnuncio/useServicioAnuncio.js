import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/Api/Api';
export const useServicioAnuncio = () => {
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchServicios = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(API_URL.SERVICIO_ANUNCIO, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setServicios(response.data);
        } catch (err) {
          console.error('Error cargando servicios:', err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchServicios();
    }, []);
  
    return { servicios, loading, error };
  };
  