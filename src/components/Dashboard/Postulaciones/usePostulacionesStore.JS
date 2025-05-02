// src/store/usePostulacionesStore.js

import { create } from "zustand";
import axios from "axios";
import { API_URL } from "../../../Api/Api";

export const usePostulacionesStore = create((set, get) => ({
    postulaciones: [],
    loading: false,
    error: null,

    fetchPostulaciones: async () => {
        set({ loading: true, error: null });
        // obtenemos el token del localStorage
        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(API_URL.POSTULACIONES, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // asumiendo que la data viene en response.data.data
            set({
                postulaciones: response.data.data ?? response.data,
                loading: false,
            });
        } catch (err) {
            console.error("❌ Error al cargar postulaciones:", err);
            set({ error: err, loading: false });
        }
    },
}));
