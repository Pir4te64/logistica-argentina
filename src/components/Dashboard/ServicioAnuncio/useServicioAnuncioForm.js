// src/components/Dashboard/ServicioAnuncio/useServicioAnuncioForm.jsx
import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/Api/Api";
import useBeneficioRepartidor from "@/components/Dashboard/Beneficios/useBeneficioRepartidor";
import useCategoriaVehiculos from "@/components/Dashboard/Categoria/useCategoriaVehiculos";
import useResaltarAnuncio from "@/components/Dashboard/ResaltarAnuncio/store/useResaltarAnuncio";
import useEstadoServicio from "@/components/Dashboard/EstadoServicio/useEstadoServicio";
import Swal from "sweetalert2";
import { nanoid } from "nanoid";

const useServicioAnuncioForm = ({ onSubmit }) => {
  // Selects
  const { data: benResp, loading: loadingBen } = useBeneficioRepartidor();
  const beneficios = benResp?.data || [];
  const { data: catResp, loading: loadingCat } = useCategoriaVehiculos();
  const categorias = catResp?.data || [];
  const { data: resResp, loading: loadingRes } = useResaltarAnuncio();
  const resaltadores = resResp?.data || [];
  const { data: estResp, loading: loadingEst } = useEstadoServicio();
  const estados = estResp?.data || [];

  // Form básico
  const [form, setForm] = useState({
    empresa: "",
    fecha_inicio_servicio: "",
    tarifa_total: "",
    periodo_nombre: "",
    periodo_valor: "",
    direccion_recogida: "",
    direccion_entrega: "",
    telefono_contacto: "",
    ciudad: "",
    cantidad_productos: "",
    cantidad_vehiculos: "",
    peso: "",
    dimensiones: "",
    fragil: false,
    liquido: false,
    requiere_refrigeracion: false,
    orden: "",                         // ← campo orden inicializado
    video_url: "",
    categoriaVehiculoId: "",
    beneficioIds: [],
    resaltarId: "",
    estadoServicioId: "",
    camposExtra: [],
  });

  // Multimedia
  const [imagenes, setImagenes] = useState([]);
  const [videoFile, setVideoFile] = useState(null);

  // Servicios dinámicos
  const [servicios, setServicios] = useState([]);
  const addServicio = () =>
    setServicios((prev) => [
      ...prev,
      { id: nanoid(), nombre: "", descripcion: "" },
    ]);
  const removeServicio = (i) =>
    setServicios((prev) => prev.filter((_, idx) => idx !== i));
  const handleServicioChange = (i, field, val) =>
    setServicios((prev) =>
      prev.map((s, idx) => (idx === i ? { ...s, [field]: val } : s))
    );

  // Plazos dinámicos
  const [plazos, setPlazos] = useState([]);
  const addPlazo = () =>
    setPlazos((prev) => [
      ...prev,
      { id: nanoid(), nombre: "", descripcion: "" },
    ]);
  const removePlazo = (i) =>
    setPlazos((prev) => prev.filter((_, idx) => idx !== i));
  const handlePlazoChange = (i, field, val) =>
    setPlazos((prev) =>
      prev.map((p, idx) => (idx === i ? { ...p, [field]: val } : p))
    );

  // Handlers básicos
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleBeneficiosChange = (e) => {
    const opts = Array.from(e.target.selectedOptions, (o) => Number(o.value));
    setForm((prev) => ({ ...prev, beneficioIds: opts }));
  };

  // Campos extra
  const handleCampoExtraChange = (i, field, val) => {
    setForm((prev) => ({
      ...prev,
      camposExtra: prev.camposExtra.map((c, idx) =>
        idx === i ? { ...c, [field]: val } : c
      ),
    }));
  };
  const addCampoExtra = () =>
    setForm((prev) => ({
      ...prev,
      camposExtra: [...prev.camposExtra, { nombre: "", valor: "" }],
    }));
  const removeCampoExtra = (i) =>
    setForm((prev) => ({
      ...prev,
      camposExtra: prev.camposExtra.filter((_, idx) => idx !== i),
    }));

  // Manejo de imágenes
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
  };
  const removeImage = (i) =>
    setImagenes((imgs) => imgs.filter((_, idx) => idx !== i));

  // Manejo de video
  const handleVideoChange = (e) => {
    const file = e.target.files[0] || null;
    setVideoFile(file);
  };
  const removeVideo = () => setVideoFile(null);

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const anuncioId = nanoid(4);
    const token = localStorage.getItem("token");
    const tipo_usuario = 2; // el tipo de usuario es el role

    // 1) Subir video
    let videoUrl = "";
    if (videoFile) {
      const fdV = new FormData();
      fdV.append("file", videoFile);
      fdV.append("filename", videoFile.name);
      fdV.append("tipo_archivo", 24); // Deberia venir una lista de tipos de archivos del backend
      fdV.append("correo", anuncioId);
      fdV.append("tipo_usuario", tipo_usuario);
      const resV = await axios.post(API_URL.UPLOAD_IMAGE, fdV, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      videoUrl = resV.data.url;
    }

    // 2) Subir imágenes
    const imagenUrls = [];
    for (const file of imagenes) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("filename", file.name);
      fd.append("tipo_archivo", 23);
      fd.append("correo", anuncioId);
      fd.append("tipo_usuario", tipo_usuario); // Banner-Card
      const res = await axios.post(API_URL.UPLOAD_IMAGE, fd, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      imagenUrls.push(res.data.url);
    }

    // 3) Filtrar campos extra
    const extras = form.camposExtra.filter(
      (c) => c.nombre.trim() !== "" || c.valor.trim() !== ""
    );

    // 4) Armar payload
    const payload = {
      empresa: form.empresa,
      fecha_inicio_servicio: form.fecha_inicio_servicio,
      tarifa_total: parseFloat(form.tarifa_total),
      periodo_nombre: form.periodo_nombre,
      periodo_valor: Number(form.periodo_valor),
      direccion_recogida: form.direccion_recogida,
      direccion_entrega: form.direccion_entrega,
      telefono_contacto: form.telefono_contacto,
      ciudad: form.ciudad,
      cantidad_productos: Number(form.cantidad_productos),
      cantidad_vehiculos: Number(form.cantidad_vehiculos),
      peso: parseFloat(form.peso),
      dimensiones: form.dimensiones,
      fragil: form.fragil,
      liquido: form.liquido,
      requiere_refrigeracion: form.requiere_refrigeracion,
      orden: Number(form.orden),            // ← enviamos orden
      video_url: videoUrl,
      categoria_vehiculo_id: Number(form.categoriaVehiculoId),
      resaltador_anuncio_id: Number(form.resaltarId),
      estado_servicio_id: Number(form.estadoServicioId),
      beneficios: form.beneficioIds,
      campos_extra: extras,
      imagenes: imagenUrls,
      servicios_servicio: servicios.map(({ nombre, descripcion }) => ({
        nombre,
        descripcion,
      })),
      servicios_plazo: plazos.map(({ nombre, descripcion }) => ({
        nombre,
        descripcion,
      })),
    };

    try {
      const resp = await axios.post(API_URL.SERVICIO_ANUNCIO, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onSubmit?.(resp.data);
      Swal.fire({ title: "Servicio creado", icon: "success", confirmButtonText: "Aceptar" })
        .then(() => window.location.reload());
    } catch (err) {
      Swal.fire({
        title: "Error al crear el servicio",
        text: err.response?.data?.message || err.message,
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return {
    form,
    beneficios,
    loadingBen,
    categorias,
    loadingCat,
    resaltadores,
    loadingRes,
    estados,
    loadingEst,
    handleChange,
    handleBeneficiosChange,
    handleCampoExtraChange,
    addCampoExtra,
    removeCampoExtra,
    handleFileChange,
    removeImage,
    handleVideoChange,
    removeVideo,
    servicios,
    addServicio,
    removeServicio,
    handleServicioChange,
    plazos,
    addPlazo,
    removePlazo,
    handlePlazoChange,
    imagenes,
    videoFile,
    handleSubmit,
  };
};

export default useServicioAnuncioForm;
