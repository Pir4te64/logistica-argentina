import React, { useState } from "react";
import Layout from "@/components/Layout";
import BeneficioRepartidor from "@/components/Dashboard/BeneficioRepartidor";
import CategoriaVehiculos from "@/components/Dashboard/CategoriaVehiculos";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Logo from "@/assets/Logo.png";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("default");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Cambia la vista y, si la pantalla es móvil (menos de 640px), colapsa el menú.
  const handleViewChange = (view) => {
    setActiveView(view);
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      setSidebarOpen(false);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case "beneficioRepartidor":
        return <BeneficioRepartidor />;
      case "categoriaVehiculos":
        return <CategoriaVehiculos />;
      default:
        return (
          <div className='flex items-center justify-center h-full'>
            <img src={Logo} alt='Logo' className='w-1/2 opacity-50' />
          </div>
        );
    }
  };

  return (
    <Layout>
      <div className='flex h-screen'>
        {/* Sidebar: se muestra siempre en pantallas grandes; en móviles se controla con sidebarOpen */}
        {sidebarOpen && (
          <aside className='w-64 bg-gray-100 p-5 border-r border-gray-300'>
            <button
              onClick={() => handleViewChange("beneficioRepartidor")}
              className='block w-full mb-4 px-4 py-2 bg-custom-dark text-white rounded hover:bg-custom-gray transition-colors'>
              Beneficio repartidor
            </button>
            <button
              onClick={() => handleViewChange("categoriaVehiculos")}
              className='block w-full mb-4 px-4 py-2 bg-custom-dark text-white rounded hover:bg-custom-gray transition-colors'>
              Categoria Vehiculos
            </button>
          </aside>
        )}

        <main className='flex-1 p-5'>
          {/* Botón para abrir o cerrar el menú, visible solo en móviles */}
          <div className='sm:hidden mb-4'>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className='px-4 py-2 bg-custom-blue text-white rounded hover:bg-custom-blue/80 transition-colors'>
              {sidebarOpen ? (
                <FaChevronLeft size={20} />
              ) : (
                <FaChevronRight size={20} />
              )}
            </button>
          </div>

          {renderContent()}
        </main>
      </div>
    </Layout>
  );
};

export default Dashboard;
