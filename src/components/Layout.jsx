import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "./WhatsAppButton";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <WhatsAppButton />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
