import React from "react";
import "./informacion.css"
const Informacion = () => {
  return (
    <div className="contenedor-nosotros">
      <h1>Cooperadora ISP N20</h1>

      <div className="contenedor-texto">
        <img
          src="/logo-isp.png"
          alt="Logo del Instituto ISP N20"
          className="imagen-instituto"
        />
        <p>
          <a
            href="https://isp20.edu.ar/nuevo/#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visitar el sitio web del Instituto ISP N20"
          >
            Visita la página del Instituto N20
          </a>
        </p>
      </div>
    </div>
  );
};

export default Informacion;
