// stores/useTipoArchivosStore.ts
import { create } from "zustand";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "@/Api/Api";



export const useTipoArchivosStore = create((set, get) => ({
  data: null,
  loading: true,
  error: null,
  showForm: false,
  formData: { nombre: "", descripcion: "" },
  creating: false,
  createError: null,
  isEditing: false,
  editFormData: { nombre: "", descripcion: "" },
  editId: null,
  editError: null,
  editing: false,

  fetchData: async () => {
    const token = localStorage.getItem("token");
    set({ loading: true });
    try {
      const res = await axios.get(API_URL.TIPO_ARCHIVOS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ data: res.data.data, error: null });
    } catch (err) {
      console.error("Error al obtener:", err);
      set({ error: err });
    } finally {
      set({ loading: false });
    }
  },

  setShowForm: (show) => set({ showForm: show }),

  handleFormChange: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      formData: { ...state.formData, [name]: value },
    }));
  },

  handleFormSubmit: async (e) => {
    e.preventDefault();
    const { formData, data } = get();
    const token = localStorage.getItem("token");
    set({ creating: true, createError: null });
    try {
      const res = await axios.post(API_URL.TIPO_ARCHIVOS, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      set({
        data: data ? [...data, res.data.data] : [res.data.data],
        formData: { nombre: "", descripcion: "" },
        showForm: false,
      });
      Swal.fire("¡Creado!", "Tipo de archivo creado exitosamente", "success");
    } catch (err) {
      set({ createError: err });
      console.error("Error al crear:", err);
    } finally {
      set({ creating: false });
    }
  },

  handleEditClick: (item) =>
    set({
      isEditing: true,
      editId: item.id,
      editFormData: {
        nombre: item.nombre,
        descripcion: item.descripcion,
        role_id: item.role_id, // ✅ incluimos role_id
      },
      editError: null,
    }),

  handleEditFormChange: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      editFormData: { ...state.editFormData, [name]: value },
    }));
  },

  handleEditSubmit: async (e) => {
    e.preventDefault();
    const { editFormData, editId, data } = get();
    const token = localStorage.getItem("token");
    set({ editing: true, editError: null });

    try {
      const res = await axios.put(`${API_URL.TIPO_ARCHIVOS}/${editId}`, editFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const updatedItem = res.data.data;
      const updatedList = data?.map((item) => (item.id === editId ? updatedItem : item)) ?? [];
      set({ data: updatedList, isEditing: false, editId: null });
    } catch (err) {
      set({ editError: err });
      console.error("Error al editar:", err);
    } finally {
      set({ editing: false });
    }
  },

  handleDelete: async (id) => {
    const token = localStorage.getItem("token");
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede revertir.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL.TIPO_ARCHIVOS}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const filtered = get().data?.filter((item) => item.id !== id);
        set({ data: filtered ?? [] });
        Swal.fire("¡Eliminado!", "El tipo de archivo fue eliminado.", "success");
      } catch (err) {
        console.error("Error al eliminar:", err);
        Swal.fire("Error", "No se pudo eliminar el tipo de archivo.", "error");
      }
    }
  },
}));
