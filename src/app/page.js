"use client";

import { useEffect, useState } from "react";
import Stats from "./componentes/Stats";
import ShowAlumno from "./componentes/ShowAlumnoInicio";
import ShowPagos from "./componentes/ShowPagosInicio";

export default function Home() {
  const [stats, setStats] = useState([]);
  const [statsInit, setStatsInit] = useState([]);

  useEffect(() => {
    fetch("/api/stats") // ejecutamos FETCH
      .then((respuesta) => respuesta.json()) // Devuelve promesa, y retornamos .json()
      .then((respuestaStats) => {
        // Devuelve promesa y actualizamos cobros
        setStats(respuestaStats);
        //setStatsInit(respuestaStats);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <h1 className="layout-titulo">Inicio</h1>

      <div className="contenedor-home">
        {stats.map((stat, index) => (
          <Stats key={index} stat={stat} />
        ))}
      </div>
      <div className="contenedor-home">
        <ShowAlumno />
      </div>
      <div className="contenedor-home">
        <ShowPagos />
      </div>
    </>
  );
}
