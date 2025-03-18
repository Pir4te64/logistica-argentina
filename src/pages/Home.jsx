import React from "react";
import Header from "../components/Header";
import HeaderBottom from "../components/HeaderBottom";
import Trabajos from "../components/Trabajos/Trabajos";
import Beneficios from "../components/Beneficios/Beneficios";
import Layout from "../components/Layout";
const Home = () => {
  return (
    <Layout>
      <Header />
      <HeaderBottom />
      <Trabajos />
      <Beneficios />
    </Layout>
  );
};

export default Home;
