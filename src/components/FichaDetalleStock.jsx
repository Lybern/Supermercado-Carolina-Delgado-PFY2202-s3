/**
 * Componente modular para mostrar la cuadrícula de métricas de stock y ubicación
 * en la vista de detalle del producto.
 */
function FichaDetalleStock({ stock, stockMinimo, estadoInfo, ubicacion }) {
  const sinStock = Number(stock) === 0;

  return (
    <div className="row g-3 my-3 p-3 bg-light rounded-3">
      <div className="col-6 col-md-3 text-center">
        <span className="text-muted small d-block">Stock Disponible</span>
        <span className={`fs-4 fw-bold ${sinStock ? "text-danger" : "text-dark"}`}>
          {stock}
        </span>
      </div>
      <div className="col-6 col-md-3 text-center">
        <span className="text-muted small d-block">Stock Mínimo</span>
        <span className="fs-5 fw-semibold text-secondary">{stockMinimo}</span>
      </div>
      <div className="col-6 col-md-3 text-center">
        <span className="text-muted small d-block">Estado de Existencias</span>
        <span className={`badge ${estadoInfo.badgeClass} mt-1`}>
          {estadoInfo.estado}
        </span>
      </div>
      <div className="col-6 col-md-3 text-center">
        <span className="text-muted small d-block">Ubicación</span>
        <span className="small fw-semibold text-dark d-block mt-1">{ubicacion}</span>
      </div>
    </div>
  );
}

export default FichaDetalleStock;
