import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import HeaderBottom from "../components/HeaderBottom";
const Home = () => {
  return (
    <div className="flex flex-col  ">
      <Navbar />
      <Header />
      <HeaderBottom />
    </div>
  );
};

export default Home;
