// App.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import RegisterGoogle from "@/pages/RegisterGoogle";
import FormularioPage from "@/pages/Formulario";
import Mensaje from "@/pages/Mensaje";
import FormularioChoferes from "@/pages/FormularioChoferes";
import FormularioComisionistaPage from "@/pages/FormularioComisionista";
import DasboardPage from "@/pages/Dasboard";
import ProtectedRoute from "@/Api/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/register-google' element={<RegisterGoogle />} />
      <Route path='/formulario' element={<FormularioPage />} />
      <Route path='/mensaje' element={<Mensaje />} />
      <Route path='/formulario-choferes' element={<FormularioChoferes />} />
      <Route
        path='/dashboard'
        element={
          <ProtectedRoute allowedIds={[1, 2]}>
            <DasboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/formulario-comisionista'
        element={<FormularioComisionistaPage />}
      />
    </Routes>
  );
}

export default App;
