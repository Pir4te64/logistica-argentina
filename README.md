# Logística Argentina SRL - Plataforma Web

## Descripción

Plataforma web para la gestión de servicios logísticos y transportistas. El sistema permite la gestión de postulaciones, documentación y seguimiento de servicios de transporte.

## Características Principales

- Sistema de autenticación y gestión de usuarios
- Gestión de postulaciones para transportistas
- Carga y gestión de documentación
- Sistema de mensajería y notificaciones
- Integración con WhatsApp para contacto rápido
- Panel de administración protegido
- Gestión de vehículos y servicios

## Estructura del Proyecto

```
src/
├── Api/              # Configuración de endpoints y servicios
├── components/       # Componentes reutilizables
├── pages/           # Páginas principales de la aplicación
├── store/           # Estado global (Zustand)
└── Transportistas/  # Componentes específicos para transportistas
```

## Tecnologías Utilizadas

- React + Vite
- React Router para navegación
- Zustand para manejo de estado
- Tailwind CSS para estilos
- API REST para backend

## Endpoints Principales

- Autenticación: `/api/login`, `/api/register`
- Gestión de Usuarios: `/api/usuarios`
- Documentación: `/api/upload-file`, `/api/tipo-archivos`
- Postulaciones: `/api/postulacion`
- Servicios: `/api/servicio-anuncio`, `/api/estado-servicio`

## Instalación

```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## Estructura de Componentes

- `Layout`: Estructura base de la aplicación
  - Navbar: Navegación principal
  - WhatsAppButton: Contacto rápido
  - PostulacionesModal: Gestión de postulaciones
  - Footer: Pie de página

## Rutas Principales

- `/`: Página principal
- `/login`: Inicio de sesión
- `/register`: Registro de usuarios
- `/formulario`: Formularios de gestión
- `/dashboard`: Panel de administración (protegido)
- `/mensaje`: Sistema de mensajería

## Desarrollo

Este proyecto utiliza:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) para Fast Refresh
- ESLint para linting
- Tailwind CSS para estilos

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
