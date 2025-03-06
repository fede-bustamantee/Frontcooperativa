import { StudientFormActionHandler } from "@/server/actions/alumnos";
import AlumnosFormComponente from "./AlumnosFormComponente";

function AgregarAlumno() {
  return (
    <div className="m-4">
      <div className="">
        <h2 className="text-center text-4xl text-slate-700 font-extrabold my-4">
          Inscripción alumno
        </h2>
        <button className="button-volver">Volver</button>
      </div>

      <div>
        <AlumnosFormComponente handler={StudientFormActionHandler} />
      </div>
    </div>
  );
}

export default AgregarAlumno;
