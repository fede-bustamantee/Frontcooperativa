"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/client";

const RootMenu = () => {
  const pathname = usePathname();
  const [session, loading] = useSession();
  
  return (
    <div className="layout-menu">
      <h1 className="menu-titulo">Cooperadora ISP20 </h1>
      <ul className="mt-3">
      <Link href="/">
        <li className={`item-menu ${pathname === "/" ? "active" : ""}`}>
          Inicio 
        </li>
        </Link>
        <Link href="/alumnos">
        <li className={`item-menu ${pathname === "/alumnos" ? "active" : ""}`}>
          Alumnos
        </li>
        </Link>
        <Link href="/cobros">
        <li className={`item-menu ${pathname === "/cobros" ? "active" : ""}`}>
          Cobros
        </li>
        </Link>
        <Link href="/informacion">
        <li
          className={`item-menu ${pathname === "/informacion" ? "active" : ""}`}
        >
          Información
        </li>
        </Link>
        {session && (
          <li>
            <button
              className="logout-button"
              onClick={() => signOut({ callbackUrl: "/iniciar-sesion" })}
            >
              Cerrar Sesión
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default RootMenu;