// src/hooks/useServicioAnuncioItem.js
import { useState, useContext } from "react";
import axios from "axios";
import { API_URL } from "@/Api/Api";
import Swal from "sweetalert2";
import { nanoid } from "nanoid";
import { AuthContext } from "@/Api/AuthContext";

export default function useServicioAnuncioItem(servicio, onUpdated) {
  const [form, setForm] = useState({
    // Con el spread {...servicio} ya traemos `orden` junto al resto de campos
    ...servicio,
    beneficios: servicio.beneficios?.map((b) => b.id) || [],
    campos_extra: servicio.campos_extra || [],
    servicios_servicio: servicio.servicios_servicio || [],
    servicios_plazo: servicio.servicios_plazo || [],
  });

  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [imagenes, setImagenes] = useState([]);
    const { user, token } = useContext(AuthContext);
  

  // 1) inputs básicos, checkboxes y números
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    let parsed;
    if (type === "checkbox") {
      parsed = checked ? 1 : 0;
    } else if (type === "number") {
      // parseamos a float; si quieres int, usa parseInt(...)
      parsed = value === "" ? "" : parseFloat(value);
    } else {
      parsed = value;
    }
    setForm((f) => ({
      ...f,
      [name]: parsed,
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
    setForm((f) => ({
      ...f,
      servicios_servicio: f.servicios_servicio.map((s, idx) =>
        idx === i ? { ...s, [field]: val } : s
      ),
    }));
  };
  const addServicio = () =>
    setForm((f) => ({
      ...f,
      servicios_servicio: [...f.servicios_servicio, { nombre: "", descripcion: "" }],
    }));
  const removeServicio = (i) =>
    setForm((f) => ({
      ...f,
      servicios_servicio: f.servicios_servicio.filter((_, idx) => idx !== i),
    }));

  // 5) Plazos asociados
  const handlePlazoChange = (i, field, val) => {
    setForm((f) => ({
      ...f,
      servicios_plazo: f.servicios_plazo.map((p, idx) =>
        idx === i ? { ...p, [field]: val } : p
      ),
    }));
  };
  const addPlazo = () =>
    setForm((f) => ({
      ...f,
      servicios_plazo: [...f.servicios_plazo, { nombre: "", descripcion: "" }],
    }));
  const removePlazo = (i) =>
    setForm((f) => ({
      ...f,
      servicios_plazo: f.servicios_plazo.filter((_, idx) => idx !== i),
    }));

  // 6) cancelar edición (resetea también los arrays)
  const handleCancel = () => {
    setForm({
      ...servicio,
      beneficios: servicio.beneficios?.map((b) => b.id) || [],
      campos_extra: servicio.campos_extra || [],
      servicios_servicio: servicio.servicios_servicio || [],
      servicios_plazo: servicio.servicios_plazo || [],
    });
    setEditMode(false);
    setError("");
  };

  // 7) guardar cambios
  const handleSave = async () => {
    setSaving(true);
    setError("");
    const anuncioId = nanoid(4);
    const tipo_usuario = user.roles[0].id; // el tipo de usuario es el role


    // Eliminamos relaciones anidadas no deseadas
    const {
      categoria_vehiculo,
      resaltador,
      estado,
      imagenes,
      created_at,
      updated_at,
      ...mainFields
    } = form;
    // 2) Subir imágenes
    const imagesUrls = [...form.imagenes]
    for (const [index, file] of imagesUrls.entries()) {
      const fd = new FormData();
      if (file.file) {
        fd.append("file", file.file);
        fd.append("filename", file.file?.name);
        fd.append("tipo_archivo", 23);
        fd.append("correo", anuncioId);
        fd.append("tipo_usuario", tipo_usuario); // Banner-Card
        const res = await axios.post(API_URL.UPLOAD_IMAGE, fd, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
        imagesUrls[index] = res.data.url; // Guardamos la URL en el objeto del form
      } else {
        imagesUrls[index] = file.imagen_url
      }
    }

    // Preparamos payload limpio (mainFields ya contiene `orden`)
    const payload = {
      ...mainFields,
      campos_extra: form.campos_extra.map(({ nombre, valor }) => ({ nombre, valor })),
      servicios_servicio: form.servicios_servicio.map(({ nombre, descripcion }) => ({
        nombre,
        descripcion,
      })),
      servicios_plazo: form.servicios_plazo.map(({ nombre, descripcion }) => ({
        nombre,
        descripcion,
      })),
      imagenes: imagesUrls,
    };

    try {
      console.log("Payload:", payload);
      await axios.put(`${API_URL.SERVICIO_ANUNCIO}/${servicio.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await Swal.fire({
        title: "Servicio Actualizado",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
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

  // 9) manejo de imágenes
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const invalid = files.filter((f) => f.size > MAX_IMAGE_SIZE);
    if (invalid.length) {
      Swal.fire({
        title: "Advertencia",
        text: "Una o más imágenes superan los 5 MB y no serán subidas.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
    const valid = files.filter((f) => f.size <= MAX_IMAGE_SIZE);
    setImagenes((imgs) => [...imgs, ...valid]);
    setForm((f) => ({
      ...f,
      imagenes: [...f.imagenes, ...valid.map((file) => ({ file }))],
    }));
  };
  const removeImage = (i) => {
    setImagenes((imgs) => imgs.filter((_, idx) => idx !== i));
    setForm({
      ...form,
      imagenes: form.imagenes.filter((_, idx) => idx !== i)
    })
  }

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
    imagenes,
    handleFileChange,
    removeImage
  };
}
