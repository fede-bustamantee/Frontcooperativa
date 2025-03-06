import { useEffect, useState } from "react";
import "./showPagosInicio.css";

export default function ShowPagos({ selectedAlumno }) {
  const [pagos, setPagos] = useState([]);
  const [users, setUsers] = useState([]); // creamos el estado 'users'
  const [usersInit, setUsersInit] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        console.log("Fetching the last 2 pagos");
        // Obtener todos los pagos realizados
        const response = await fetch(`/api/pagos`);
        const data = await response.json();

        console.log("Response data:", data);

        // Verificar si la respuesta es un array
        if (Array.isArray(data.pagos)) {
          // Limitar a los dos últimos pagos
          const lastTwoPagos = data.pagos.slice(0, 2);
          setPagos(lastTwoPagos);
        } else {
          console.error("La respuesta de la API no es un array:", data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los pagos:", error);
        setLoading(false);
      }
    };

    fetchPagos();
  }, []);

  if (loading) {
    return <div>Cargando pagos...</div>;
  }

  return (
    <div className="contenedor-ultimos-pagos">
      <h1>Últimos Pagos Realizados</h1>
      {pagos.length > 0 ? (
        <ul>
          {pagos.map((pago) => (
            <li key={pago._id}>
              <p>Importe: {pago.cobro_id && pago.cobro_id.monto ? pago.cobro_id.monto : 'No disponible'}</p>
              <p>Fecha: {pago.fechaCreacion ? new Date(pago.fechaCreacion).toLocaleDateString() : 'No disponible'}</p>
              <p>
                Alumno: {pago.alumno_id ? 
                  `${pago.alumno_id.nombre || 'Nombre no disponible'} ${pago.alumno_id.apellido || 'Apellido no disponible'}` : 
                  'Alumno no disponible'}
              </p>
              <p>Concepto: {pago.cobro_id && pago.cobro_id.titulo ? pago.cobro_id.titulo : 'No disponible'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay pagos disponibles</p>
      )}
    </div>
  );
}