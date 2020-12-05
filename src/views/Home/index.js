import React from "react";
import "./index.scss";
import Hero from "../../components/Hero";
import Nav from "../../components/Nav";

const Home = () => {
  return (
    <div className="home">
      <Nav />
      <Hero />
    </div>
  );
};

export default Home;
