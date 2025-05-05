import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PostulacionesModal from "@/Transportistas/PostulacionesModal";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <WhatsAppButton />
      <PostulacionesModal />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
