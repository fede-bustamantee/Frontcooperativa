"use client";

import { formatDate } from "@/utils/format-helpers";
import { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";

export default function EditarPagoForm({ params, handler, pagos }) {
  const { id, pagoId } = params; // id del alumno y el pago
  const [alumno, setAlumno] = useState(null);
  const [pago, setPago] = useState(null);

  const [pagosState, setPagosState] = useState(pagos);

  const formRef = useRef(null);

  useEffect(() => {
    const fetchAlumnoYPago = async () => {
      try {
        // Obtener datos del alumno
        const alumnoResponse = await fetch(
          `http://localhost:3000/api/alumnos/${id}`
        );
        if (!alumnoResponse.ok) throw new Error("Alumno request failed");
        const alumnoData = await alumnoResponse.json();
        setAlumno(alumnoData);

        // Obtener el pago correspondiente al alumno
        const pagoResponse = await fetch(
          `http://localhost:3000/api/pagos/${pagoId}`
        );
        if (!pagoResponse.ok) throw new Error("Pago request failed");
        const pagoData = await pagoResponse.json();
        setPago(pagoData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAlumnoYPago();
  }, [id, pagoId]);

  const efectuarPago = async (pagoId) => {
    const pagosModificados = pagosState.map((pago) => {
      if (pago._id === data._id) {
        pago.pagado = true;
      }

      return pago;
    });
    setPagosState(pagosModificados);
  };

  const formAction = async (formData) => {
    try {
      const response = await handler(formData, alumno, pago);

      if (response && response._id) {
        Swal.fire({
          title: "Pago actualizado",
          text: `El pago ha sido marcado como pagado con éxito.`,
          icon: "success",
          confirmButtonColor: "#d33",
          confirmButtonText: "VOLVER",
        }).then(() => {
          window.location.href = `/alumnos/${alumno._id}`;
        });
      }
    } catch (error) {
      alert("Hubo un error. Intente nuevamente");
    }
  };

  function OnCancelHandler() {
    window.history.back();
  }

  return alumno && pago ? (
    <div className="contenedor-selector">
      <div>
        <form
          ref={formRef}
          action={formAction}
          className="max-w-xl mt-4 bg-[--tropical-indigo] mx-auto p-8 rounded-lg border-2 border-violet-400 shadow-lg"
        >
          <h2 className="text-white font-bold text-xl mb-4">Editar Pago</h2>
          <div className="mb-4">
            <label htmlFor="alumno" className="block text-white font-bold">
              Alumno
            </label>
            <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200">
              {`${alumno.nombre} ${alumno.apellido}`}
            </div>
            <input type="hidden" name="alumno_id" value={alumno._id} />
          </div>
          <div className="mb-4">
            <label htmlFor="cobro" className="block text-white font-bold">
              Cobro
            </label>
            <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200">
              {pago.cobro_id.titulo}
            </div>
            <input
              type="hidden"
              name="fechaCreacion"
              value={pago.fechaCreacion}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fecha" className="block text-white font-bold">
              Fecha
            </label>
            <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200">
              {formatDate(pago.fechaCreacion)}
            </div>
          </div>

          <div className="flex">
            <div className="flex items-center justify-center mr-8">
              <button
                disabled={pago.pagado}
                onClick={() => efectuarPago(pago._id)}
              >
                Abonar
              </button>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={OnCancelHandler}
                className="bg-green-600 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <p>Cargando...</p>
  );
}
