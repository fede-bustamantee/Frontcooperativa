// ReporteAlumnoPage.js
"use client";
import PdfReport from "@/app/componentes/Pdf/PdfReport";
import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";

export default function ReporteAlumnoPage({ params }) {
  const [alumno, setAlumno] = useState();

  useEffect(() => {
    fetch(`http://localhost:3000/api/alumnos/${params.id}`)
      .then((resp) => resp.json())
      .then((data) => setAlumno(data));
  }, [params.id]);

  return (
    <div className="reportContainer">
      {alumno ? (
        <PDFViewer width="100%" height="600">
          <PdfReport alumno={alumno} />
        </PDFViewer>
      ) : (
        <p>Cargando datos del alumno...</p>
      )}
    </div>
  );
}
