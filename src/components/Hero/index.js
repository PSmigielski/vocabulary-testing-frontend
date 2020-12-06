import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero">
      <p className="hero__paragraph">
        Przecwicz swoje słowictwo z języka angielskiego!
      </p>
      <div className="hero__buttons">
        <Link className="link" to="/register">
          <button className="hero__button">Rozpocznij</button>
        </Link>
        <Link className="link" to="/login">
          <button className="hero__button">Mam już konto</button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
