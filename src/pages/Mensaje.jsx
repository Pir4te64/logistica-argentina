import React, { useEffect } from "react";
import MensajeComponent from "@/components/MensajeComponent";
import Layout from "@/components/Layout";

const Mensaje = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <MensajeComponent />
    </Layout>
  );
};

export default Mensaje;
