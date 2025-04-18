// src/components/Dashboard/ServicioAnuncio/servicioAnuncioForm.data.js

import * as Yup from 'yup';

// Valores iniciales para Formik
export const initialValues = {
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
  imagenes: [],
  categoriaVehiculoId: '',
  beneficioIds: [],
  resaltarId: '',
  estadoServicioId: '',
  camposExtra: [
    { nombre: '', valor: '' }
  ],
};

// Esquema de validación con Yup
export const validationSchema = Yup.object().shape({
  empresa: Yup.string()
    .required('La empresa es obligatoria'),

  fecha_inicio_servicio: Yup.date()
    .required('La fecha de inicio es obligatoria')
    // No permitir fechas anteriores a hoy
    .min(
      new Date().setHours(0, 0, 0, 0),
      'La fecha no puede ser anterior a hoy'
    ),

  tarifa_total: Yup.number()
    .typeError('La tarifa debe ser un número')
    .required('La tarifa total es obligatoria')
    .positive('La tarifa debe ser mayor que cero'),

  periodo_nombre: Yup.string(),
  periodo_valor: Yup.number()
    .typeError('El valor debe ser un número entero')
    .integer('Debe ser un número entero')
    .min(0, 'No puede ser menor que cero'),

  direccion_recogida: Yup.string(),
  direccion_entrega: Yup.string(),

  telefono_contacto: Yup.string()
    .matches(
      /^[0-9()+\-\s]+$/,
      'Teléfono inválido'
    ),

  ciudad: Yup.string(),

  cantidad_productos: Yup.number()
    .typeError('Debe ser un número entero')
    .integer('Debe ser un número entero')
    .min(0, 'No puede ser negativo'),

  cantidad_vehiculos: Yup.number()
    .typeError('Debe ser un número entero')
    .integer('Debe ser un número entero')
    .min(0, 'No puede ser negativo'),

  peso: Yup.number()
    .typeError('El peso debe ser un número')
    .positive('El peso debe ser mayor que cero'),

  dimensiones: Yup.string(),

  fragil: Yup.boolean(),
  liquido: Yup.boolean(),
  requiere_refrigeracion: Yup.boolean(),

  video_url: Yup.string()
    .url('Debe ser una URL válida'),

  imagenes: Yup.array().of(
    Yup.mixed()
      .test(
        'fileType',
        'Solo se permiten imágenes JPEG o PNG',
        (file) => !file || ['image/jpeg', 'image/png'].includes(file.type)
      )
  ),

  categoriaVehiculoId: Yup.number()
    .typeError('Selecciona una categoría')
    .required('La categoría es obligatoria'),

  beneficioIds: Yup.array()
    .of(Yup.number()),

  resaltarId: Yup.number()
    .typeError('Selecciona un resaltador')
    .required('El resaltador es obligatorio'),

  estadoServicioId: Yup.number()
    .typeError('Selecciona un estado')
    .required('El estado es obligatorio'),

  camposExtra: Yup.array().of(
    Yup.object().shape({
      nombre: Yup.string().required('El nombre es obligatorio'),
      valor: Yup.string().required('El valor es obligatorio'),
    })
  ),
});
