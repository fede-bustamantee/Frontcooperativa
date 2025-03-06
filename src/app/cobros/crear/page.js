import CobrosFormComponent from "@/app/componentes/CobrosFormComponent";
import { CobrosFormActionHandler } from "@/server/actions/cobros";


const CrearCobroPage = () => {
   return (
    <>
     <CobrosFormComponent handler={CobrosFormActionHandler}/>
    </>
   );
 }


export default CrearCobroPage
