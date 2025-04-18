// src/hooks/useServicioAnuncioForm.js
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/Api/Api';
import useBeneficioRepartidor from '../Beneficios/useBeneficioRepartidor';
import useCategoriaVehiculos from '../Categoria/useCategoriaVehiculos';
import useResaltarAnuncio from '../ResaltarAnuncio/useResaltarAnuncio';
import useEstadoServicio from '../EstadoServicio/useEstadoServicio';

/**
 * Hook que encapsula toda la lógica de creación de un Servicio de Anuncio:
 * - Estado del formulario
 * - Handlers para inputs, selects, campos extra e imágenes
 * - Lógica de subida de imagenes y POST de creación
 * - Datos cargados de los endpoints: beneficios, categorías, resaltadores y estados
 */
const useServicioAnuncioForm = ({ onSubmit }) => {
  // datos para selects
  const { data: beneficiosResponse, loading: loadingBen } = useBeneficioRepartidor();
  const beneficios = beneficiosResponse?.data || [];

  const { data: categoriasResponse, loading: loadingCat } = useCategoriaVehiculos();
  const categorias = categoriasResponse?.data || [];

  const { data: resaltarResponse, loading: loadingRes } = useResaltarAnuncio();
  const resaltadores = resaltarResponse?.data || [];

  const { data: estadosResponse, loading: loadingEst } = useEstadoServicio();
  const estados = estadosResponse?.data || [];

  // estado del formulario
  const [form, setForm] = useState({
    empresa: '',
    fecha_inicio_servicio: '',
    tarifa_total: '',
    periodo_nombre: '',
    periodo_valor: '',
    direccion_recogida: '',
    direccion_entrega: '',
    telefono_contacto: '',
    ciudad: '',
    cantidad_productos: '',
    cantidad_vehiculos: '',
    peso: '',
    dimensiones: '',
    fragil: false,
    liquido: false,
    requiere_refrigeracion: false,
    video_url: '',
    categoriaVehiculoId: '',
    beneficioIds: [],
    resaltarId: '',
    estadoServicioId: '',
    camposExtra: [{ nombre: '', valor: '' }],
    imagenes: []
  });

  // Handlers básicos
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleBeneficiosChange = e => {
    const opts = Array.from(e.target.selectedOptions, o => Number(o.value));
    setForm(prev => ({ ...prev, beneficioIds: opts }));
  };

  // Campos extra
  const handleCampoExtraChange = (i, field, val) => {
    setForm(prev => ({
      ...prev,
      camposExtra: prev.camposExtra.map((c, idx) =>
        idx === i ? { ...c, [field]: val } : c
      )
    }));
  };
  const addCampoExtra = () =>
    setForm(prev => ({ ...prev, camposExtra: [...prev.camposExtra, { nombre: '', valor: '' }] }));
  const removeCampoExtra = i =>
    setForm(prev => ({ ...prev, camposExtra: prev.camposExtra.filter((_, idx) => idx !== i) }));

  // Archivos
  const handleFileChange = e => {
    const files = Array.from(e.target.files);
    setForm(prev => ({ ...prev, imagenes: files }));
  };

  // Submit
  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const correo = user.email;
    const tipo_usuario = 2;

    // 1. subir imágenes
    const imagenUrls = [];
    for (const file of form.imagenes) {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('filename', file.name);
      fd.append('tipo_archivo', 3);
      fd.append('correo', correo);
      fd.append('tipo_usuario', tipo_usuario);
      const res = await axios.post(API_URL.UPLOAD_IMAGE, fd, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      imagenUrls.push(res.data.url);
    }

    // 2. armar payload
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
      video_url: form.video_url,
      categoria_vehiculo_id: Number(form.categoriaVehiculoId),
      resaltador_anuncio_id: Number(form.resaltarId),
      estado_servicio_id: Number(form.estadoServicioId),
      beneficio_repartidor_ids: form.beneficioIds,
      campos_extra: form.camposExtra,
      imagenes: imagenUrls
    };

    // 3. POST creación
    try {
      const resp = await axios.post(API_URL.SERVICIO_ANUNCIO, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Creado:', resp.data);
      onSubmit && onSubmit(resp.data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return {
    // form state
    form,
    // select data + loading
    beneficios, loadingBen,
    categorias, loadingCat,
    resaltadores, loadingRes,
    estados, loadingEst,
    // handlers
    handleChange,
    handleBeneficiosChange,
    handleCampoExtraChange,
    addCampoExtra,
    removeCampoExtra,
    handleFileChange,
    handleSubmit
  };
};

export default useServicioAnuncioForm;
