// BeneficiosHeader.jsx
import React from "react";
import MiniCard from "./Card";

const BeneficiosHeader = () => {
  return (
    <div id="beneficios">
      <header className="bg-custom-blue p-6 h-40 mt-20 flex flex-col justify-center">
        <h2 className="text-custom-dark text-4xl font-bold text-center">
          Beneficios
        </h2>
      </header>
      <MiniCard />
    </div>
  );
};

export default BeneficiosHeader;
