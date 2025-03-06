"use client";

import Link from "next/link";
import { useRef } from "react";
import Swal from "sweetalert2";

export default function CobrosFormComponente({ handler }) {
  const formRef = useRef(null); // Crear una referencia para el formulario

  const formAction = async (formData) => {
    try {
      const response = await handler(formData);
      console.log("Respuesta del servidor:", response);
      if (response && response._id) {
        Swal.fire({
          title: "Cobro creado",
          text: `Se ha guardado el cobro ${response.titulo} con éxito`,
          icon: "success",
          confirmButtonColor: "#d33",
          confirmButtonText: "VOLVER",
        }).then(() => {
          window.location.href = "/cobros";
        });
      }
    } catch (error) {
      alert("Hubo un error. Intente nuevamente");
    }
  };

  return (
    <form
      ref={formRef} // Asociar la referencia al formulario
      action={formAction}
      className=" max-w-xl mt-4 bg-[--tropical-indigo] mx-auto  p-8  rounded-lg border-2 border-violet-400 shadow-lg "
    >
      <div className="mb-4">
        <label htmlFor="titulo" className="block text-white font-bold ">
          Título:
        </label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          placeholder="título de cobro"
          className="shadow appearance-none border rounded w-full  hover:border-blue-800  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="descripcion" className="block text-white font-bold ">
          Descripción
        </label>
        <input
          type="text"
          id="descripcion"
          name="descripcion"
          placeholder="descripción del cobro"
          className="shadow appearance-none border rounded w-full  hover:border-blue-800  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="monto" className="block text-white font-bold ">
          Monto:
        </label>
        <input
          type="text"
          id="monto"
          name="monto"
          placeholder="100000"
          className="shadow appearance-none border rounded w-full  hover:border-blue-800  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="flex ">
        <div className="flex items-center justify-center  mr-8">
          <button
            type="submit"
            className="bg-blue-500 mt-4  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Guardar
          </button>
        </div>
        <div className="flex items-center justify-center">
          <Link href={"/cobros"}>
            <button
              type="submit"
              className="bg-green-600 mt-4   hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancelar
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
}
