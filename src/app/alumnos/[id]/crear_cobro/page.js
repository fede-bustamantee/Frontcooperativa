"use client";

import PagosFormComponente from "@/app/componentes/PagosFormComponente";
import { PagosFormActionHandler } from "@/server/actions/pagos";

const CrearPagoPage = ({ params }) => {
  return (
    <>
      <PagosFormComponente params={params} handler={PagosFormActionHandler} />
    </>
  );
};

export default CrearPagoPage;
