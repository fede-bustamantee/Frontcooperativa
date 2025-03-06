export default function CobroCuota({ alumno, periodo, monto, fechaPago }) {
  return (
    <div className="recibo-contenedor">
      <h2 className="recibo-titulo">Recibo de Cuota Cooperadora</h2>
      <div className="recibo-item">
        <span className="recibo-label">Alumno:</span>
        <input type="text" className="recibo-valor"></input >
      </div>
      <div className="recibo-item">
        <span className="recibo-label">Período:</span>
        <input type="text" className="recibo-valor"></input >
      </div>
      <div className="recibo-item">
        <span className="recibo-label">Monto:</span>
        <input type="text" className="recibo-valor"></input >
      </div>
      <div className="recibo-item">
        <span className="recibo-label">Fecha de pago:</span>
        <input type="text" className="recibo-valor"></input >
      </div>
      <div className="boton-recibo">
        <button className="button success">Imprimir</button>
        <button className="button warning">Cancelar</button>
      </div>
    </div>
  );
}
