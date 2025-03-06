"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function AlumnosPage() {
  const [users, setUsers] = useState([]); // creamos el estado 'users
  const [usersInit, setUsersInit] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/alumnos") // ejecutamos FETCH
      .then((respuesta) => respuesta.json()) // Devuelve promesa, y retornamos .json()
      .then((users) => {
        // Devuelve promesa y actualizamos users
        setUsers(users);
        setUsersInit(users);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const searchStudents = (e) => {
    const filtro = e.target.value;
    const usuariosFiltrados =
      usersInit.filter((user) =>
        user.nombre.toLowerCase().includes(filtro.toLowerCase())
      ) ||
      usersInit.filter((user) =>
        user.apellido.tolowerCase().includes(filtro.tolowerCase())
      );
    setUsers(usuariosFiltrados);
  };

  const deleteStudentHandler = (id, user) => {
    // Confirmación antes de eliminar
    Swal.fire({
      title: `¿Estás seguro/a de que deseas eliminar a ${user.nombre} ${user.apellido}?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:3000/api/alumnos", {
          method: "DELETE",
          body: id,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // Actualizar la tabla después de la eliminación
            setUsers((prevUsers) =>
              prevUsers.filter((user) => user._id !== id)
            ); //==
            //const usuariosFiltrados = users.filter(user => user._id != response._id)
            //const usuariosFiltradosInit = usersInit.filter(user => user._id != response._id)
            //setUsers(usuariosFiltrados)
            //setUsersInit(usuariosFiltradosInit)

            Swal.fire({
              title: "Alumno eliminado",
              text: "El alumno fue eliminado correctamente",
              icon: "success",
              confirmButtonText: "OK",
            });
          });
      }
    });
  };

  return (
    <div className="h-auto w-full">
      <div className="data-controls">
        <form className="">
          <input
            onKeyUp={searchStudents}
            type="text"
            placeholder="Buscar alumno/a"
            className=""
          />
        </form>
        <Link href={"/alumnos/crear"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2  rounded">
            Nuevo alumno/a
          </button>
        </Link>
      </div>
      <table className="menuTable">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-4 py-1  text-lg font-semibold text-gray-500 w-auto "
            >
              ID
            </th>
            <th
              scope="col"
              className="px-4 py-1  text-lg font-semibold text-gray-500"
            >
              NOMBRE Y APELLIDO
            </th>
            <th
              scope="col"
              className="px-4 py-1  text-lg font-semibold text-gray-500 "
            >
              DNI
            </th>
            <th
              scope="col"
              className="px-4 py-1  text-lg font-semibold text-gray-500 "
            >
              DIRECCIÓN
            </th>
            <th
              scope="col"
              className="px-4 py-1  text-lg font-semibold text-gray-500 "
            >
              EDAD
            </th>
            <th
              scope="col"
              className="px-4 py-1  text-lg font-semibold text-gray-500 "
            ></th>
            <th
              scope="col"
              className="px-4 py-1  text-lg font-semibold text-gray-500 "
            ></th>
            <th
              scope="col"
              className="px-4 py-1  text-lg font-semibold text-gray-500 "
            ></th>
            <th
              scope="col"
              className="px-4 py-1  text-lg font-semibold text-gray-500 "
            ></th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td>Cargando ...</td>
            </tr>
          )}
          {!loading &&
            users.map((user, index) => (
              <tr className="bg-white hover:bg-slate-300" key={index}>
                <td className="   text-xl border-b-2   whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="  text-xl border-b-2  whitespace-nowrap">
                  {`${user.nombre} ${user.apellido}`}
                </td>
                <td className=" text-xl border-b-2  whitespace-nowrap">
                  {user.dni}
                </td>
                <td className="text-xl border-b-2  whitespace-nowrap">
                  {user.direccion}
                </td>
                <td className="text-xl border-b-2  whitespace-nowrap">
                  {user.edad}
                </td>
                <td className=" text-xl border-b-2  whitespace-nowrap">
                  <button
                    onClick={() => {
                      deleteStudentHandler(user._id, user);
                    }}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2   rounded"
                  >
                    Eliminar
                  </button>
                </td>
                <td className=" text-xl border-b-2  whitespace-nowrap">
                <Link href={`/alumnos/${user._id}/editar`}>
  <button className="bg-[--jungle-green] hover:bg-[--jungle-greenHover] text-white font-bold py-1 px-2 rounded">
    Editar
  </button>
</Link>
                </td>
                <td className="text-sm lg:text-xl border-b-2  whitespace-nowrap">
                  <Link href={`/alumnos/${user._id}/crear_cobro`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2  rounded">
                      Cargar Cobro
                    </button>
                  </Link>
                </td>
                <td className="text-xl border-b-2 whitespace-nowrap">
  <Link href={`/alumnos/${user._id}/detalle`}>
    <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded">
      Detalle
    </button>
  </Link>
</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
