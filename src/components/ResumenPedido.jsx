import { Link } from "react-router";
import { formatearMoneda } from "../utils/inventarioUtils";

/**
 * Componente modular para el resumen de pedido en el carrito de compras.
 */
function ResumenPedido({ totalUnidades, totalArticulos, totalPagar, onFinalizar }) {
  return (
    <div className="card shadow-sm border-0 sticky-top" style={{ top: "1rem" }}>
      <div className="card-header bg-white py-3 border-bottom">
        <h2 className="h6 mb-0 fw-bold text-dark">Resumen del Pedido</h2>
      </div>
      <div className="card-body p-3">
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted">Total de Unidades</span>
          <span className="fw-semibold text-dark">{totalUnidades}</span>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <span className="text-muted">Artículos Únicos</span>
          <span className="fw-semibold text-dark">{totalArticulos}</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between align-items-center mb-4">
          <span className="fs-5 fw-bold text-dark">Total</span>
          <span className="fs-4 fw-bold text-success">
            {formatearMoneda(totalPagar)}
          </span>
        </div>

        <button
          type="button"
          className="btn btn-success w-100 fw-bold py-2 shadow-sm mb-2"
          onClick={onFinalizar}
        >
          Finalizar Pedido
        </button>
        <Link to="/inventario" className="btn btn-outline-secondary w-100 btn-sm">
          Continuar Agregando
        </Link>
      </div>
    </div>
  );
}

export default ResumenPedido;
