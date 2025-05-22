import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import FormularioPage from "@/pages/Formulario";
import Mensaje from "@/pages/Mensaje";
import FormularioChoferes from "@/pages/FormularioChoferes";
import FormularioComisionistaPage from "@/pages/FormularioComisionista";
import DasboardPage from "@/pages/Dasboard";
import ProtectedRoute from "@/Api/ProtectedRoute";
import NotFound from "@/404";
import MensajeTransportista from "@/components/MensajeTransportista";
import RecuperarPasswordPage from "@/pages/RecuperarPassword";

function App() {
  return (
    <Routes>
      {/* Página principal de la aplicación */}
      <Route path="/" element={<Home />} />

      {/* Rutas de autenticación */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recuperar" element={<RecuperarPasswordPage />} />

      {/* Rutas de formularios */}
      <Route path="/formulario" element={<FormularioPage />} />
      <Route path="/formulario-choferes" element={<FormularioChoferes />} />
      <Route
        path="/formulario-comisionista"
        element={<FormularioComisionistaPage />}
      />

      {/* Rutas de mensajes y notificaciones */}
      <Route path="/mensaje" element={<Mensaje />} />
      <Route path="/mensaje-transportista" element={<MensajeTransportista />} />

      {/* Dashboard protegido - Solo accesible para usuarios con ID 1 o 2 */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute allowedIds={[1, 2]}>
            <DasboardPage />
          </ProtectedRoute>
        }
      />

      {/* Ruta para manejar páginas no encontradas (404) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
