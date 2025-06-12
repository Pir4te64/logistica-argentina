// URL base de la API
export const BASE_URL = "https://backend.logisticaargentinasrl.com.ar";

// Objeto que contiene todas las URLs de los endpoints de la API
export const API_URL = {
  // Endpoints de autenticación y gestión de usuarios
  LOGIN: `${BASE_URL}/api/login`,                    // Inicio de sesión
  REGISTER: `${BASE_URL}/api/register`,              // Registro de nuevos usuarios
  LOGOUT: `${BASE_URL}/api/logout`,                  // Cierre de sesión
  CHANGE_PASSWORD: `${BASE_URL}/api/cambiar-password`, // Cambio de contraseña del usuario actual
  CHANGE_PASSWORD_OTHER: `${BASE_URL}/api/usuarios`,   // Cambio de contraseña de otros usuarios
  LISTAR_USUARIOS: `${BASE_URL}/api/usuarios/listar`,  // Listado de usuarios del sistema

  // Endpoints de gestión de archivos y documentos
  UPLOAD_IMAGE: `${BASE_URL}/api/upload-file`,       // Subida de archivos/imágenes
  TIPO_ARCHIVO: `${BASE_URL}/api/tipo-archivos`,     // Tipos de archivos permitidos
  TIPO_ARCHIVOS: `${BASE_URL}/api/tipo-archivos`,    // Alias para tipos de archivos
  GET_LOGISTICA_IMAGES: `${BASE_URL}/api/files/Administrador@gmail.com/2`, // Obtener imágenes de logística

  // Endpoints de gestión de repartidores
  BENEFICIO_REPARTIDOR: `${BASE_URL}/api/beneficio-repartidor`, // Beneficios para repartidores
  ESTADO_REPARTIDOR: `${BASE_URL}/api/estado-repartidor`,       // Estados de los repartidores

  // Endpoints de gestión de vehículos y servicios
  CATEGORIA_VEHICULOS: `${BASE_URL}/api/categoria-vehiculos`,   // Categorías de vehículos
  ESTADO_SERVICIO: `${BASE_URL}/api/estado-servicio`,           // Estados de los servicios
  NUMEROS_SOPORTE: `${BASE_URL}/api/numeros-soporte`,           // Estados de los servicios

  // Endpoints de gestión de anuncios
  RESALTADOR_ANUNCIO: `${BASE_URL}/api/resaltador-anuncio`,     // Resaltado de anuncios
  SERVICIO_ANUNCIO: `${BASE_URL}/api/servicio-anuncio`,         // Servicios de anuncios
  POSTULACIONES: `${BASE_URL}/api/postulacion`,                 // Gestión de postulaciones
};
