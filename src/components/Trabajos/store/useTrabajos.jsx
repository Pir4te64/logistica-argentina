// src/store/useServiciosAnuncioStore.js
import { create } from "zustand";
import axios from "axios";
import { API_URL } from "@/Api/Api";

export const useTrabajos = create((set) => ({
  servicios: [],
  loading: false,
  error: null,

  // Acción para cargar los servicios
  fetchServicios: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get(API_URL.SERVICIO_ANUNCIO, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dataServices = response.data.map((servicio) => ({
        ...servicio,
        bannerImg: servicio.imagenes.find(img => img.imagen_url.includes("bannerImg")) || null,
        imagenes: servicio.imagenes.filter(img => !img.imagen_url.includes("bannerImg")),
      }));
      set({ servicios: dataServices, loading: false });
    } catch (err) {
      console.error("❌ Error al cargar servicios:", err);
      set({ error: err, loading: false });
    }
  },
}));
