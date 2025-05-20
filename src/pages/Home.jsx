import React from "react";
import HeaderBottom from "@/components/HeaderBottom";
import Trabajos from "@/components/Trabajos/Trabajos";
import Beneficios from "@/components/Beneficios/Beneficios";
import Layout from "@/components/Layout";
import Testimonials from "@/components/Testimonios/Testimonials";
import Header from "@/components/Header/Header";
const Home = () => {
  return (
    <Layout>
      <Header />
      <HeaderBottom />
      <Trabajos />
      <Beneficios />
      <Testimonials />
    </Layout>
  );
};

export default Home;
