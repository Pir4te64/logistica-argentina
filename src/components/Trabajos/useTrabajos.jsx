// src/store/useServiciosAnuncioStore.js
import { create } from "zustand";
import axios from "axios";
import { API_URL } from "@/Api/Api";

export const useTrabajos = create((set, get) => ({
    servicios: [],
    loading: false,
    error: null,

    // Acción para cargar los servicios
    fetchServicios: async () => {
        set({ loading: true, error: null });
        // obtengo el token directamente del otro store
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(API_URL.SERVICIO_ANUNCIO, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("▶ Servicios anuncio:", response.data);
            set({ servicios: response.data.data, loading: false });
        } catch (err) {
            console.error("❌ Error al cargar servicios:", err);
            set({ error: err, loading: false });
        }
    },
}));
