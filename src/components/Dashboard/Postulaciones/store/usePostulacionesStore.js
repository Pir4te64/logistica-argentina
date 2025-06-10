// src/store/usePostulacionesStore.js

import { create } from "zustand";
import axios from "axios";
import { API_URL } from "@/Api/Api";
import Swal from "sweetalert2";


export const usePostulacionesStore = create((set, get) => ({
    postulaciones: [],
    loading: false,
    error: null,
    editing: null,
    form: {},

    // Fetch all postulaciones
    fetchPostulaciones: async () => {
        set({ loading: true, error: null })
        try {
            const { data } = await axios.get(API_URL.POSTULACIONES, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            set({ postulaciones: data.data, loading: false })
        } catch (err) {
            set({ error: 'Error al obtener las postulaciones.', loading: false })
        }
    },

    // Start editing a postulacion
    startEdit: async (id) => {
        set({ loading: true })
        try {
            const { data } = await axios.get(`${API_URL.POSTULACIONES}/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            const p = data.data
            set({
                editing: p,
                form: {
                    fecha_inicio_servicio: p.fecha_inicio_servicio.slice(0, 10),
                    fecha_fin_servicio: p.fecha_fin_servicio.slice(0, 10),
                    cumple_requisitos: p.cumple_requisitos,
                    asignado: p.asignado,
                    puntos: p.puntos
                },
                loading: false
            })
        } catch {
            Swal.fire('Error', 'No se pudo cargar la postulación.', 'error')
            set({ loading: false })
        }
    },

    // Update form field
    setFormField: (field, value) => {
        set(state => ({ form: { ...state.form, [field]: value } }))
    },

    // Save edits
    submitEdit: async () => {
        const { editing, form } = get()
        try {
            await axios.put(`${API_URL.POSTULACIONES}/${editing.id}`, form, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            Swal.fire('Actualizado', 'La postulación fue actualizada.', 'success')
            get().fetchPostulaciones()
            set({ editing: null })
        } catch {
            Swal.fire('Error', 'No se pudo actualizar.', 'error')
        }
    },

    // Toggle booleans inline
    toggleBoolean: async (row, field, value) => {
        const payload = {
            fecha_inicio_servicio: row.fecha_inicio_servicio,
            fecha_fin_servicio: row.fecha_fin_servicio,
            cumple_requisitos: field === 'cumple_requisitos' ? value : row.cumple_requisitos,
            asignado: field === 'asignado' ? value : row.asignado,
            puntos: row.puntos
        }
        try {
            await axios.put(`${API_URL.POSTULACIONES}/${row.id}`, payload, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            get().fetchPostulaciones()
        } catch {
            Swal.fire('Error', 'No se pudo actualizar.', 'error')
        }
    },

    // Delete postulacion
    deletePostulacion: async (id) => {
        const result = await Swal.fire({
            title: '¿Eliminar postulación?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        })
        if (result.isConfirmed) {
            try {
                await axios.delete(`${API_URL.POSTULACIONES}/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                })
                Swal.fire('Eliminado', 'La postulación fue eliminada.', 'success')
                get().fetchPostulaciones()
            } catch {
                Swal.fire('Error', 'No se pudo eliminar.', 'error')
            }
        }
    }
}))
