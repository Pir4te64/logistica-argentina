import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterGoogle from "./pages/RegisterGoogle";
import FormularioPage from "./pages/Formulario";
import Mensaje from "./pages/Mensaje";
import FormularioChoferes from "./pages/FormularioChoferes";
import FormularioComisionistaPage from "./pages/FormularioComisionista";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register-google" element={<RegisterGoogle />} />
      <Route path="/formulario" element={<FormularioPage />} />
      <Route path="/mensaje" element={<Mensaje />} />
      <Route path="/formulario-choferes" element={<FormularioChoferes />} />
      <Route
        path="/formulario-comisionista"
        element={<FormularioComisionistaPage />}
      />
    </Routes>
  );
}

export default App;
