// src/hooks/useServicioAnuncioItem.js
import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/Api/Api";

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
      await axios.put(`${API_URL.SERVICIO_ANUNCIO}/${servicio.id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditMode(false);
      onUpdated();
    } catch {
      setError("No se pudo guardar. Intenta nuevamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("¿Seguro querés eliminar este servicio?")) return;
    setDeleting(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL.SERVICIO_ANUNCIO}/${servicio.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onUpdated();
    } catch {
      setError("No se pudo eliminar. Intenta nuevamente.");
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
