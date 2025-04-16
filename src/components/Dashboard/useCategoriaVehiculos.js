// hooks/useCategoriaVehiculos.js
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../Api/Api";

const useCategoriaVehiculos = () => {
  // Estados generales
  const [data, setData] = useState(null); // Respuesta de la API
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para errores

  // Estados para creación de un nuevo vehículo
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ nombre: "", descripcion: "" });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(null);

  // Estados para edición de un vehículo existente
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({ nombre: "", descripcion: "" });
  const [editId, setEditId] = useState(null);
  const [editError, setEditError] = useState(null);
  const [editing, setEditing] = useState(false);

  // --------------------------------------------
  // 1. Obtener datos (GET)
  // --------------------------------------------
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(API_URL.CATEGORIA_VEHICULOS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Respuesta de la API:", response.data);
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

  // --------------------------------------------
  // 2. Crear nuevo vehículo (POST)
  // --------------------------------------------
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    setCreateError(null);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(API_URL.CATEGORIA_VEHICULOS, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      // Suponemos que la respuesta contiene en response.data.data el objeto recién creado
      setData({
        ...data,
        data: [...data.data, response.data.data],
      });
      setFormData({ nombre: "", descripcion: "" });
      setShowForm(false);
      // Mostrar alerta de éxito en la creación
      Swal.fire({
        title: "¡Creado!",
        text: "El vehículo ha sido creado.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (err) {
      console.error("Error al crear el vehículo:", err);
      setCreateError(err);
    } finally {
      setCreating(false);
    }
  };

  // --------------------------------------------
  // 3. Editar vehículo (PUT)
  // --------------------------------------------
  const handleEditClick = (vehiculo) => {
    setEditFormData({
      nombre: vehiculo.nombre,
      descripcion: vehiculo.descripcion,
    });
    setEditId(vehiculo.id);
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
      // Se envía el id dentro del body junto con el resto de los datos
      const response = await axios.put(
        API_URL.CATEGORIA_VEHICULOS,
        { id: editId, ...editFormData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const updatedItem = response.data.data;
      const updatedList = data.data.map((item) =>
        item.id === editId ? updatedItem : item
      );

      setData({ ...data, data: updatedList });
      setIsEditing(false);
      setEditId(null);
    } catch (err) {
      console.error("Error al editar el vehículo:", err);
      setEditError(err);
    } finally {
      setEditing(false);
    }
  };

  // --------------------------------------------
  // 4. Eliminar vehículo (DELETE)
  // --------------------------------------------
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    // Mostrar confirmación con SweetAlert2
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
        await axios.delete(`${API_URL.CATEGORIA_VEHICULOS}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Filtramos el registro eliminado
        setData({
          ...data,
          data: data.data.filter((vehiculo) => vehiculo.id !== id),
        });
        Swal.fire({
          title: "¡Borrado!",
          text: "El vehículo ha sido eliminado.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } catch (err) {
        console.error("Error al eliminar el vehículo:", err);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al eliminar el vehículo.",
          icon: "error",
          confirmButtonText: "Aceptar",
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
    editId,
    editError,
    editing,
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

export default useCategoriaVehiculos;
