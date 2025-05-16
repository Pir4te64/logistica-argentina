// BeneficiosHeader.jsx
import React from "react";
import MiniCard from "@/components/Beneficios/Card";

const BeneficiosHeader = () => {
  return (
    <div id="beneficios">
      <header className="mt-20 flex h-40 flex-col justify-center bg-custom-blue p-6">
        <h2 className="text-center text-4xl font-bold text-custom-dark">
          Beneficios
        </h2>
      </header>
      <MiniCard />
    </div>
  );
};

export default BeneficiosHeader;
