import EditarPagoForm from "@/app/componentes/EditarPagoForm";
import { PagosFormActionHandler } from "@/server/actions/pagos";

export default function EditarPago({ params }) {
  return (
    <>
      <EditarPagoForm params={params} handler={PagosFormActionHandler} />
    </>
  );
}
