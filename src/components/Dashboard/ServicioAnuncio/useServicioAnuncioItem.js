// src/hooks/useServicioAnuncioItem.js
import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/Api/Api";
import Swal from "sweetalert2";

export default function useServicioAnuncioItem(servicio, onUpdated) {
  // Inicializo form incluyendo los IDs de los beneficios actuales
  const [form, setForm] = useState({
    ...servicio,
    beneficios: servicio.beneficios?.map((b) => b.id) || [],
  });
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  // inputs básicos y checkboxes
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  // multi‑select Beneficios
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



  // Campos extra
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

  const handleCancel = () => {
    setForm({
      ...servicio,
      beneficios: servicio.beneficios?.map((b) => b.id) || [],
    });
    setEditMode(false);
    setError("");
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {

      const token = localStorage.getItem("token");
      const data = await axios.put(`${API_URL.SERVICIO_ANUNCIO}/${servicio.id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      //console.log(data);

      setEditMode(false);
      onUpdated();
    } catch {
      setError("No se pudo guardar. Intenta nuevamente.");
    } finally {
      setSaving(false);
    }
  };


  const handleDelete = async () => {
    // 1) Muestro el modal de confirmación
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el servicio de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6b7280',  // gris
      reverseButtons: true,
    });

    // 2) Si no confirma, salgo
    if (!result.isConfirmed) return;

    // 3) Continúo con la eliminación
    setDeleting(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL.SERVICIO_ANUNCIO}/${servicio.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 4) Muestro un mensaje de éxito
      await Swal.fire({
        title: 'Eliminado',
        text: 'El servicio fue eliminado correctamente.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });

      onUpdated();
    } catch (err) {
      setError('No se pudo eliminar. Intenta nuevamente.');

      // 5) Muestro un error si falla
      Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar. Intenta nuevamente.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
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
    handleCancel,
    handleSave,
    handleDelete,
  };
}
