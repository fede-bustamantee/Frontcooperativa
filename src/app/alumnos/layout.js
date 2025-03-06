"use client";

import { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/client"; // Importa desde next-auth/client en v3

export default function AlumnosLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        window.location.href = "/iniciar-sesion"; // Redirige a la página de login si no hay sesión
      } else {
        setLoading(false); // Si hay sesión, deja de mostrar el loading
      }
    };

    checkSession();
  }, []);

  if (loading) {
    return <p>Cargando...</p>; // Muestra un mensaje de carga mientras se verifica la sesión
  }

  return (
    <div className="layout-container">
      <div className="layout-header">
        <h1 className="layout-titulo">Alumnos</h1>
      </div>
      <div className="page-wrapper">{children}</div>
    </div>
  );
}
