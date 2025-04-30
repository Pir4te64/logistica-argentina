// src/hooks/useServicioAnuncioItem.js
import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/Api/Api";
import Swal from "sweetalert2";

export default function useServicioAnuncioItem(servicio, onUpdated) {
  // Inicializo form incluyendo los IDs de los beneficios actuales
  // y asegurándome de que existan los arrays de campos_extra, servicio_servicios y servicio_plazos
  const [form, setForm] = useState({
    ...servicio,
    beneficios: servicio.beneficios?.map((b) => b.id) || [],
    campos_extra: servicio.campos_extra || [],
    servicio_servicios: servicio.servicio_servicios || [],
    servicio_plazos: servicio.servicio_plazos || [],
  });

  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  // 1) inputs básicos y checkboxes
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  // 2) multi-select Beneficios
  const toggleBeneficio = (id) => {
    setForm((f) => {
      const already = f.beneficios.includes(id);
      return {
        ...f,
        beneficios: already
          ? f.beneficios.filter((b) => b !== id)
          : [...f.beneficios, id],
      };
    });
  };

  // 3) Campos extra
  const handleExtraChange = (i, field, val) => {
    setForm((f) => ({
      ...f,
      campos_extra: f.campos_extra.map((c, idx) =>
        idx === i ? { ...c, [field]: val } : c
      ),
    }));
  };
  const addExtra = () =>
    setForm((f) => ({
      ...f,
      campos_extra: [...f.campos_extra, { nombre: "", valor: "" }],
    }));
  const removeExtra = (i) =>
    setForm((f) => ({
      ...f,
      campos_extra: f.campos_extra.filter((_, idx) => idx !== i),
    }));

  // 4) Servicios asociados
  const handleServicioChange = (i, field, val) => {
    setForm(f => ({
      ...f,
      servicio_servicios: f.servicio_servicios.map((s, idx) =>
        idx === i ? { ...s, [field]: val } : s
      ),
    }));
  };
  
  const addServicio = () => {
    setForm(f => ({
      ...f,
      servicio_servicios: [
        ...f.servicio_servicios,
        { nombre: "", descripcion: "" },
      ],
    }));
  };
  
  const removeServicio = (i) =>
    setForm((f) => ({
      ...f,
      servicio_servicios: f.servicio_servicios.filter((_, idx) => idx !== i),
    }));

  // 5) Plazos asociados
  const handlePlazoChange = (i, field, val) => {
    setForm((f) => ({
      ...f,
      servicio_plazos: f.servicio_plazos.map((p, idx) =>
        idx === i ? { ...p, [field]: val } : p
      ),
    }));
  };
  const addPlazo = () =>
    setForm((f) => ({
      ...f,
      servicio_plazos: [...f.servicio_plazos, { nombre: "", descripcion: "" }],
    }));
  const removePlazo = (i) =>
    setForm((f) => ({
      ...f,
      servicio_plazos: f.servicio_plazos.filter((_, idx) => idx !== i),
    }));

  // 6) cancelar edición (resetea también los arrays)
  const handleCancel = () => {
    setForm({
      ...servicio,
      beneficios: servicio.beneficios?.map((b) => b.id) || [],
      campos_extra: servicio.campos_extra || [],
      servicio_servicios: servicio.servicio_servicios || [],
      servicio_plazos: servicio.servicio_plazos || [],
    });
    setEditMode(false);
    setError("");
  };

  // 7) guardar cambios
  const handleSave = async () => {
    setSaving(true);
    setError("");
  
    // 1) Desestructuramos para eliminar las relaciones anidadas que no queremos
    const {
      categoria_vehiculo,
      resaltador,
      estado,
      imagenes,
      created_at,
      updated_at,
      // todo lo demás en mainFields
      ...mainFields
    } = form;
  
    // 2) Construimos payload “limpio”
    const payload = {
      ...mainFields,
  
      // Campos extra: sólo id (si existe), nombre y valor
      campos_extra: form.campos_extra.map(({ nombre, valor }) => ({
        nombre,
        valor,
      })),
    
      servicio_servicios: form.servicio_servicios.map(({ nombre, descripcion }) => ({
        nombre,
        descripcion,
      })),
    
      servicio_plazos: form.servicio_plazos.map(({ nombre, descripcion }) => ({
        nombre,
        descripcion,
      })),
    };
  
    //console.log("▶️ Payload limpio:", payload);
  
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${API_URL.SERVICIO_ANUNCIO}/${servicio.id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditMode(false);
      onUpdated();
    } catch (err) {
      console.error(err);
      setError("No se pudo guardar. Intenta recargar la página.");
    } finally {
      setSaving(false);
    }
  };
  
  

  // 8) eliminar servicio
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el servicio de forma permanente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });
    if (!result.isConfirmed) return;

    setDeleting(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL.SERVICIO_ANUNCIO}/${servicio.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await Swal.fire({
        title: "Eliminado",
        text: "El servicio fue eliminado correctamente.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      onUpdated();
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar. Intenta nuevamente.");
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar. Intenta nuevamente.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    } finally {
      setDeleting(false);
    }
  };

  return {
    form,
    editMode,
    saving,
    deleting,
    error,
    setEditMode,
    handleChange,
    toggleBeneficio,
    handleExtraChange,
    addExtra,
    removeExtra,
    handleServicioChange,
    addServicio,
    removeServicio,
    handlePlazoChange,
    addPlazo,
    removePlazo,
    handleCancel,
    handleSave,
    handleDelete,
  };
}
