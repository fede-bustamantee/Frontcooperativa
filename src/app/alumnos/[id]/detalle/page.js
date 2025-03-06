"use client";
import { use } from 'react';
import PagosAlumnoComponente from "@/app/componentes/PagosAlumnoComponente";
import { formatNumberToCurrency, formatDate } from "@/utils/format-helpers";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function DetalleAlumnoPage({ params }) {
  // Usar React.use() para extraer el ID correctamente
  const alumnoId = use(params).id;
  
  const [alumno, setAlumno] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAlumnoData() {
      try {
        const resp = await fetch(`http://localhost:3000/api/alumnos/${alumnoId}`);
        const data = await resp.json();
        setAlumno(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al cargar los datos del alumno:", error);
        setIsLoading(false);
      }
    }

    fetchAlumnoData();
  }, [alumnoId]);

  if (isLoading) {
    return <p>Cargando datos de alumno...</p>;
  }

  if (!alumno) {
    return <p>No se encontraron datos del alumno</p>;
  }

  return (
    <div>
      <h2 className="subTitulo">Detalle de cobros</h2>
      <h3 className="subH3">Alumno/a:</h3>
      <h1 className="font-extrabold from-neutral-500 text-slate-500 text-4xl border-b-4 border-slate-600 mb-6">
        {alumno.nombre} {alumno.apellido}
      </h1>
      <div className="contenedor-datos">
        <ul className="ul-datos-detalle">
          <li className="li-datos-detalle">
            <strong>DNI</strong>: {alumno.dni}
          </li>
          <li className="li-datos-detalle">
            <strong>DIRECCIÓN</strong>: {alumno.direccion}
          </li>
          <li className="li-datos-detalle">
            <strong>TELÉFONO</strong>: {alumno.telefono}
          </li>
          <li className="li-datos-detalle">
            <strong>EMAIL</strong>: {alumno.email}
          </li>
          <li className="li-datos-detalle">
  <strong>FECHA DE NACIMIENTO</strong>:
  {formatDate(alumno.fechaNacimiento)}
</li>
          <div className="contenedor-cobros-detalle">
            {alumno.pagos && alumno.pagos.length > 0 ? (
              <>
                <PagosAlumnoComponente
                  pagos={alumno.pagos}
                  alumno={alumno._id}
                  params={params}
                />

                <div className="flex justify-center my-4">
                  <Link href={`/alumnos/${alumno._id}/crear_cobro`}>
                    <button className="bg-[--jungle-green] hover:bg-[--jungle-greenHover] text-white font-bold py-1 px-2 rounded">
                      CREAR OTRO COBRO
                    </button>
                  </Link>
                </div>

                <div className="resumenPagos">
                  <h3 className="font-extrabold border-b-2 border-black text-center text-slate-600 text-2xl">
                    RESUMEN DE PAGOS:
                  </h3>
                  <ul>
                    <li>
                      TOTAL:
                      <strong>
                        {formatNumberToCurrency(alumno.totalPagos)}
                      </strong>
                    </li>
                    <li>
                      ABONADOS:
                      <strong>
                        {formatNumberToCurrency(alumno.pagosAbonados)}
                      </strong>
                    </li>
                    <li>
                      SALDOS:
                      <strong className="text-red-700">
                        {formatNumberToCurrency(alumno.pagosPendientes)}
                      </strong>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="text-center my-4">
                <h2 className="text-xl font-bold text-red-500">
                  El alumno no tiene ningún pago
                </h2>
                <Link href={`/alumnos/${alumno._id}/crear_cobro`}>
                  <button className="bg-[--jungle-green] hover:bg-[--jungle-greenHover] text-white font-bold py-1 px-2 rounded mt-4">
                    CREAR COBRO
                  </button>
                </Link>
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
}