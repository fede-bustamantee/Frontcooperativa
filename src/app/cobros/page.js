"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function CobrosPage() {
  const [cobros, setCobros] = useState([]);
  const [cobrosInit, setCobrosInit] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:2003/cobros") // URL corregida
      .then((respuesta) => respuesta.json())
      .then((respuestaCobros) => {
        setCobros(respuestaCobros);
        setCobrosInit(respuestaCobros);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching cobros:", err));
  }, []);

  const buscarCobros = (e) => {
    const filtro = e.target.value.toLowerCase();
    const cobrosFiltrados = cobrosInit.filter(
      (cobro) =>
        cobro.titulo.toLowerCase().includes(filtro) ||
        cobro.descripcion.toLowerCase().includes(filtro)
    );
    setCobros(cobrosFiltrados);
  };

  const deleteCobroHandler = (id, titulo) => {
    Swal.fire({
      title: `¿Estás seguro/a de que deseas eliminar "${titulo}"?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:2003/cobros/${id}`, { // ID en la URL
          method: "DELETE",
        })
          .then((response) => response.json())
          .then(() => {
            setCobros((prevCobros) =>
              prevCobros.filter((cobro) => cobro._id !== id)
            );

            Swal.fire({
              title: "Cobro eliminado",
              text: "El cobro fue eliminado correctamente",
              icon: "success",
              confirmButtonText: "OK",
            });
          })
          .catch((err) => console.error("Error deleting cobro:", err));
      }
    });
  };

  return (
    <div className="h-auto">
      <div className="data-controls flex justify-between mb-4">
        <input
          onChange={buscarCobros}
          type="text"
          placeholder="Buscar cobro"
          className="border p-2 rounded"
        />
        <Link href="/cobros/crear">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Nuevo cobro
          </button>
        </Link>
      </div>

      <div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">
                TÍTULO
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">
                DESCRIPCIÓN
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">
                MONTO
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-600">
                ACCIONES
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  Cargando...
                </td>
              </tr>
            ) : (
              cobros.map((cobro) => (
                <tr
                  key={cobro._id} // Clave única para el mapeo
                  className="bg-white hover:bg-gray-100 border-b"
                >
                  <td className="px-4 py-2">{cobro.titulo}</td>
                  <td className="px-4 py-2">{cobro.descripcion}</td>
                  <td className="px-4 py-2">{cobro.monto}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => deleteCobroHandler(cobro._id, cobro.titulo)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
