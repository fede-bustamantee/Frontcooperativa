import { useEffect, useState } from "react";
import "./showAlumnosInicio.css";

export default function ShowAlumno() {
  const [alumnos, setAlumnos] = useState([]);
  const [users, setUsers] = useState([]); // creamos el estado 'users
    const [usersInit, setUsersInit] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        // Obtener los últimos 2 alumnos creados
        const response = await fetch("/api/alumnos?limit=2");
        const data = await response.json();
        setAlumnos(data);
      } catch (error) {
        console.error("Error al obtener los alumnos:", error);
      }
    };

    fetchAlumnos();
  }, []);

  return (
    <div className="contenedor-alumnos-ultimos">
      <h1>Últimos Alumnos Creados</h1>
      <ul>
        {alumnos.map((alumno) => (
          <li key={alumno._id}>
            <p>Nombre: {alumno.nombre}</p>
            <p>Apellido: {alumno.apellido}</p>
            <p>DNI: {alumno.dni}</p>
            <p>Email: {alumno.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
