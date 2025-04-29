import { useState } from "react";
import axios from "axios";
import { API_URL } from "@/Api/Api";
import useBeneficioRepartidor from "@/components/Dashboard/Beneficios/useBeneficioRepartidor";
import useCategoriaVehiculos from "@/components/Dashboard/Categoria/useCategoriaVehiculos";
import useResaltarAnuncio from "@/components/Dashboard/ResaltarAnuncio/useResaltarAnuncio";
import useEstadoServicio from "@/components/Dashboard/EstadoServicio/useEstadoServicio";
import Swal from "sweetalert2";
import { nanoid } from "nanoid";

const useServicioAnuncioForm = ({ onSubmit }) => {
  // datos para selects
  const { data: benResp, loading: loadingBen } = useBeneficioRepartidor();
  const beneficios = benResp?.data || [];
  const { data: catResp, loading: loadingCat } = useCategoriaVehiculos();
  const categorias = catResp?.data || [];
  const { data: resResp, loading: loadingRes } = useResaltarAnuncio();
  const resaltadores = resResp?.data || [];
  const { data: estResp, loading: loadingEst } = useEstadoServicio();
  const estados = estResp?.data || [];

  // estado general del formulario (sin multimedia)
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
    video_url: "",
    categoriaVehiculoId: "",
    beneficioIds: [],
    resaltarId: "",
    estadoServicioId: "",
    camposExtra: [], // inicial vacío
  });

  // estado para imágenes y video
  const [imagenes, setImagenes] = useState([]);
  const [videoFile, setVideoFile] = useState(null);

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

  // Archivos (imágenes)
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
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
  const removeImage = (index) =>
    setImagenes((imgs) => imgs.filter((_, i) => i !== index));

  // Archivo de video (solo uno)
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
    JSON.parse(localStorage.getItem("user") || "{}");
    const tipo_usuario = 2;

    // 1) Subir video si existe
    let videoUrl = "";
    if (videoFile) {
      const fdVid = new FormData();
      fdVid.append("file", videoFile);
      fdVid.append("filename", videoFile.name);
      fdVid.append("tipo_archivo", 24);
      fdVid.append("correo", anuncioId);
      fdVid.append("tipo_usuario", tipo_usuario);
      const resVid = await axios.post(API_URL.UPLOAD_IMAGE, fdVid, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      videoUrl = resVid.data.url;
    }

    // 2) Subir imágenes
    const imagenUrls = [];
    for (const file of imagenes) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("filename", file.name);
      fd.append("tipo_archivo", 23);
      fd.append("correo", anuncioId);
      fd.append("tipo_usuario", tipo_usuario);
      const res = await axios.post(API_URL.UPLOAD_IMAGE, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      imagenUrls.push(res.data.url);
    }

    // Filtrar campos extras vacíos
    const extras = form.camposExtra
      .filter(c => c.nombre.trim() !== "" || c.valor.trim() !== "");

    // 3) Armar payload
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
      video_url: videoUrl,
      categoria_vehiculo_id: Number(form.categoriaVehiculoId),
      resaltador_anuncio_id: Number(form.resaltarId),
      estado_servicio_id: Number(form.estadoServicioId),
      beneficios: form.beneficioIds,
      campos_extra: extras, // solo los llenos
      imagenes: imagenUrls,
    };

    try {
      const resp = await axios.post(API_URL.SERVICIO_ANUNCIO, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onSubmit && onSubmit(resp.data);
      Swal.fire({ title: "Servicio creado", icon: "success", confirmButtonText: "Aceptar" }).then(() => {
        window.location.reload();
      }
      );
    } catch (err) {
      console.log(err);
      
      Swal.fire({ title: "Error al crear el servicio", text: err.response?.data?.message || err.message, icon: "error", confirmButtonText: "Cerrar" });
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
    handleSubmit,
    imagenes,
    videoFile,
  };
};

export default useServicioAnuncioForm;