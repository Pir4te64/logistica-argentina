// src/components/Dashboard/ServicioAnuncio/Header.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";        // un solo import de estilos

import { useNavigate } from "react-router-dom";

// === 1) Assets locales (backup) =========================
import chofer1 from "@/assets/Header/header.jpg";
import chofer2 from "@/assets/Header/header2.jpg";
import comision1 from "@/assets/Header/header3.jpg";
import comision2 from "@/assets/Header/header3-5.jpg";
import transport1 from "@/assets/Header/header4.jpg";
import transport2 from "@/assets/Header/header45.jpg";
import useLogisticaImages from "./useLogisticaImages";

// === 2) Textos & rutas por tipo =========================
const TEXT_BY_TYPE = {
  choferes: ["Chofer y Ayudante",
    "Postúlate<br/>Si querés trabajar como chofer o ayudante ¿Qué esperás?"],
  comisionistas: ["Comisionista",
    "Generá ingresos, si querés ser comisionista<br/>¿Qué esperás?"],
  transportistas: ["Transportista",
    "¡Crecé con nosotros! Expandí tu marca: trabajamos en todo el país."],
};

const ROUTE_BY_TYPE = {
  choferes: "/formulario-choferes",
  comisionistas: "/formulario-comisionista",
};

// === 3) Flag para usar imágenes remotas =================
const USE_REMOTE_IMAGES = true;   // ← cámbialo a true para testear

// ========================================================
export default function Header() {
  const navigate = useNavigate();
  const { transportistas, choferes, comisionistas } = useLogisticaImages();

  // --- Prepara los slides locales -----------------------
  const localSlides = [
    { img: chofer1, text: TEXT_BY_TYPE.choferes[0], route: ROUTE_BY_TYPE.choferes },
    { img: chofer2, text: TEXT_BY_TYPE.choferes[1], route: ROUTE_BY_TYPE.choferes },
    { img: comision1, text: TEXT_BY_TYPE.comisionistas[0], route: ROUTE_BY_TYPE.comisionistas },
    { img: comision2, text: TEXT_BY_TYPE.comisionistas[1], route: ROUTE_BY_TYPE.comisionistas },
    { img: transport1, text: TEXT_BY_TYPE.transportistas[0], route: ROUTE_BY_TYPE.transportistas },
    { img: transport2, text: TEXT_BY_TYPE.transportistas[1], route: ROUTE_BY_TYPE.transportistas },
  ];

  // --- Prepara los slides remotos -----------------------
  const remoteSlides = [
    ...choferes.map((url, i) => ({
      img: url,
      text: TEXT_BY_TYPE.choferes[i % TEXT_BY_TYPE.choferes.length],
      route: ROUTE_BY_TYPE.choferes,
    })),
    ...comisionistas.map((url, i) => ({
      img: url,
      text: TEXT_BY_TYPE.comisionistas[i % TEXT_BY_TYPE.comisionistas.length],
      route: ROUTE_BY_TYPE.comisionistas,
    })),
    ...transportistas.map((url, i) => ({
      img: url,
      text: TEXT_BY_TYPE.transportistas[i % TEXT_BY_TYPE.transportistas.length],
      route: ROUTE_BY_TYPE.transportistas,
    })),
  ];

  // --- Elige la fuente según el flag --------------------
  const slides = USE_REMOTE_IMAGES && remoteSlides.length ? remoteSlides : localSlides;

  return (
    <Swiper
      modules={[EffectFade, Navigation, Autoplay]}
      effect="slide"
      slidesPerView={1}
      loop
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      className="h-[400px] w-full sm:h-[500px] md:h-screen"
    >
      {slides.map(({ img, text, route }, idx) => (
        <SwiperSlide key={idx}>
          <div
            className="relative h-full w-full cursor-pointer bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
            onClick={() => navigate(route)}
          >
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-custom-red to-transparent px-4 py-6">
              <span
                className="text-md block whitespace-pre-line text-left font-bold text-white sm:text-2xl md:text-3xl"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
