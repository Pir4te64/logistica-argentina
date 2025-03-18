// MiniCard.jsx
import React from "react";
import beneficio1 from "../../assets/beneficios/1.jpg";
import beneficio2 from "../../assets/beneficios/2.jpg";
import beneficio3 from "../../assets/beneficios/3.jpg";
import beneficio4 from "../../assets/beneficios/4.jpg";
import beneficio5 from "../../assets/beneficios/5.jpg";

const MiniCard = () => {
  const miniCardsData = [
    {
      imageUrl: beneficio1,
      title: "Cuenta Corriente de Combustible",
      description: "Siempre ten tu tanque lleno y listo para la distribución!",
    },
    {
      imageUrl: beneficio2,
      title: "10% en Neumáticos",
      description: "Te ayudamos a tener siempre lo mejor y más nuevo",
    },
    {
      imageUrl: beneficio3,
      title: "10% en Repuestos",
      description:
        "Que nada te impida estar siempre en movimiento y generando ingresos",
    },
    {
      imageUrl: beneficio4,
      title: "10% en Lubricantes",
      description:
        "Queremos tanto como vos que tu vehículo siempre funcione con lo mejor",
    },
    {
      imageUrl: beneficio5,
      title: "Viaja Seguro y Tranquilo",
      description:
        "Te damos una póliza de seguro y paga una tarifa de hasta un 20% de lo que pagas actualmente",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 -mt-10 w-11/12 mx-auto justify-items-center">
      {miniCardsData.map((card, index) => (
        <div
          key={index}
          className="block w-full max-w-xs rounded overflow-hidden shadow hover:shadow-md transition-shadow bg-white"
        >
          {/* Imagen en la parte superior */}
          <img
            src={card.imageUrl}
            alt={card.title}
            className="w-full h-40 object-cover"
          />

          {/* Contenido de texto */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {card.title}
            </h3>
            <p className="text-gray-600 mt-2 text-sm">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MiniCard;
