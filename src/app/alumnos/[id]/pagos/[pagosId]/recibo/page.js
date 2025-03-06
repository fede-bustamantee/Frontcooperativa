"use client";

import React, { useEffect, useState } from "react";
import { use } from 'react';
import PdfRecibo from "@/app/componentes/Pdf/PdfRecibo";
import { PagosFormActionHandler } from "@/server/actions/pagos";

// Configuración para trabajar con paquetes ESM en Next.js
export default function ReciboAlumnoPage({ params }) {
  // Usar React.use() para desenvolver los parámetros
  const unwrappedParams = use(params);
  const { id, pagosId } = unwrappedParams;

  const [alumno, setAlumno] = useState(null);
  const [pago, setPago] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [PDFViewer, setPDFViewer] = useState(null);

  // Cargar dinámicamente PDFViewer solo en el cliente
  useEffect(() => {
    // Importar React PDF solo en el cliente
    const loadPdf = async () => {
      try {
        // Usar import() dinámico para cargar el módulo ESM
        const ReactPDF = await import('@react-pdf/renderer');
        setPDFViewer(() => ReactPDF.PDFViewer);
        setPdfLoaded(true);
      } catch (error) {
        console.error("Error cargando el módulo PDF:", error);
        setError("No se pudo cargar el visualizador de PDF. " + error.message);
      }
    };
    
    loadPdf();
  }, []);

  useEffect(() => {
    const fetchAlumnoYPago = async () => {
      try {
        if (!id || !pagosId) {
          throw new Error(`ID del alumno o pago no proporcionado.`);
        }

        // Obtener datos del alumno
        const alumnoResponse = await fetch(
          `http://localhost:3000/api/alumnos/${id}`
        );

        if (!alumnoResponse.ok) {
          throw new Error(`Alumno request failed: ${alumnoResponse.status}`);
        }

        const alumnoData = await alumnoResponse.json();
        setAlumno(alumnoData);

        // Obtener el pago correspondiente al alumno
        const pagoResponse = await fetch(
          `http://localhost:3000/api/pagos/${pagosId}`
        );

        if (!pagoResponse.ok) {
          throw new Error(`Pago request failed: ${pagoResponse.status}`);
        }

        const pagoData = await pagoResponse.json();
        setPago(pagoData);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumnoYPago();
  }, [id, pagosId]);

  // Muestra un mensaje de carga mientras se obtienen los datos
  if (loading) {
    return <p>Cargando datos del recibo...</p>;
  }

  // Mostrar un mensaje de error si algo salió mal
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Verificar si se obtuvo correctamente el alumno y el pago
  if (!alumno || !pago) {
    return <p>Error al cargar los datos del recibo.</p>;
  }

  // Mostrar mensaje de carga mientras se carga el visualizador de PDF
  if (!pdfLoaded || !PDFViewer) {
    return <p>Cargando visualizador de PDF...</p>;
  }

  // Renderizar el PDF cuando todo esté listo
  return (
    <div className="reportContainer">
      <PDFViewer width="100%" height="500">
        <PdfRecibo
          alumno={alumno}
          pago={pago}
          handler={PagosFormActionHandler}
        />
      </PDFViewer>
    </div>
  );
}