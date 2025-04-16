// hooks/useBeneficioRepartidor.js
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "@/Api/Api";

const useBeneficioRepartidor = () => {
  // Estados generales
  const [data, setData] = useState(null); // Respuesta de la API
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores

  // Estados para creación de un nuevo beneficio
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ nombre: "", descripcion: "" });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);

  // Estados para edición de un beneficio existente
  const [isEditing, setIsEditing] = useState(false); // Activa formulario de edición
  const [editFormData, setEditFormData] = useState({ nombre: "", descripcion: "" });
  const [editId, setEditId] = useState(null); // id del beneficio a editar
  const [editing, setEditing] = useState(false); // Loading de la edición
  const [editError, setEditError] = useState(null);

  // =============================================
  // 1. OBTENER DATOS (GET)
  // =============================================
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(API_URL.BENEFICIO_REPARTIDOR, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (err) {
      console.error("Error al obtener los datos:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  // =============================================
  // 2. CREAR (POST)
  // =============================================
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    setCreateError(null);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        API_URL.BENEFICIO_REPARTIDOR,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Asumimos que la API devuelve en response.data.data el nuevo beneficio
      setData({
        ...data,
        data: [...data.data, response.data.data],
      });
      setFormData({ nombre: "", descripcion: "" });
      setShowForm(false);
      // Mostrar alerta de éxito en la creación
      Swal.fire({
        title: "¡Creado!",
        text: "El beneficio ha sido creado.",
        icon: "success",
        confirmButtonText: "Aceptar"
      });
    } catch (err) {
      console.error("Error al crear el beneficio:", err);
      setCreateError(err);
    } finally {
      setCreating(false);
    }
  };

  // =============================================
  // 3. EDITAR (PUT)
  // =============================================
  const handleEditClick = (beneficio) => {
    setEditFormData({
      nombre: beneficio.nombre,
      descripcion: beneficio.descripcion,
    });
    setEditId(beneficio.id);
    setIsEditing(true);
    setEditError(null);
  };

  const handleEditFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditing(true);
    setEditError(null);
    const token = localStorage.getItem("token");

    try {
      // Enviamos el id dentro del body junto con los datos de edición
      const response = await axios.put(
        API_URL.BENEFICIO_REPARTIDOR,
        { id: editId, ...editFormData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Asumimos que la API devuelve en response.data.data el beneficio actualizado
      const updatedBeneficio = response.data.data;
      const updatedList = data.data.map((item) =>
        item.id === editId ? updatedBeneficio : item
      );
      setData({ ...data, data: updatedList });
      setIsEditing(false);
      setEditId(null);
    } catch (err) {
      console.error("Error al editar el beneficio:", err);
      setEditError(err);
    } finally {
      setEditing(false);
    }
  };

  // =============================================
  // 4. ELIMINAR (DELETE)
  // =============================================
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    // Se solicita confirmación antes de borrar
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede revertir.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL.BENEFICIO_REPARTIDOR}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData({
          ...data,
          data: data.data.filter((beneficio) => beneficio.id !== id),
        });
        Swal.fire({
          title: "¡Borrado!",
          text: "El beneficio ha sido eliminado.",
          icon: "success",
          confirmButtonText: "Aceptar"
        });
      } catch (err) {
        console.error("Error al eliminar el beneficio:", err);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al eliminar el beneficio.",
          icon: "error",
          confirmButtonText: "Aceptar"
        });
      }
    }
  };

  return {
    data,
    loading,
    error,
    showForm,
    formData,
    creating,
    createError,
    isEditing,
    editFormData,
    editing,
    editError,
    setShowForm,
    fetchData,
    handleFormChange,
    handleFormSubmit,
    handleEditClick,
    handleEditFormChange,
    handleEditSubmit,
    handleDelete,
  };
};

export default useBeneficioRepartidor;
