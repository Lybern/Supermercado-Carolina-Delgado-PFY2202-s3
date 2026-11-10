import { Link } from "react-router";
import { formatearMoneda } from "../utils/inventarioUtils";

/**
 * Componente modular para el resumen de pedido en el carrito de compras.
 */
function ResumenPedido({ totalUnidades, totalArticulos, totalPagar, onFinalizar, onVaciar }) {
  return (
    <div className="card shadow-md border-0 rounded-2xl overflow-hidden sticky-top" style={{ top: "1rem" }}>
      <div className="card-header bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-900 py-3.5 px-4 d-flex align-items-center justify-content-between">
        <h2 className="h6 mb-0 fw-black text-slate-900 d-flex align-items-center gap-2">
          <span>🧾</span> Resumen del Pedido
        </h2>
        <span className="badge bg-white text-slate-900 fw-bold px-2.5 py-0.5 rounded-pill shadow-xs">
          Simulación
        </span>
      </div>
      <div className="card-body p-4">
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted">Total de Unidades</span>
          <span className="fw-bold text-dark">{totalUnidades}</span>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <span className="text-muted">Artículos Únicos</span>
          <span className="fw-bold text-dark">{totalArticulos}</span>
        </div>

        <div className="bg-emerald-50/90 border border-emerald-200 rounded-xl p-3 my-3 d-flex justify-content-between align-items-center shadow-xs">
          <div>
            <span className="text-xs text-emerald-800 font-bold uppercase tracking-wider d-block">Total a Pagar</span>
            <small className="text-muted" style={{ fontSize: "0.7rem" }}>IVA Incluido</small>
          </div>
          <span className="fs-3 fw-black text-emerald-700">
            {formatearMoneda(totalPagar)}
          </span>
        </div>

        <button
          type="button"
          className="btn btn-success w-100 fw-bold py-2.5 shadow mb-2 text-base active:scale-95 transition"
          onClick={onFinalizar}
        >
          ✅ Finalizar Pedido
        </button>
        {onVaciar && (
          <button
            type="button"
            className="btn btn-outline-danger w-100 btn-sm mb-2"
            onClick={onVaciar}
          >
            🗑️ Vaciar Carrito
          </button>
        )}
        <Link to="/inventario" className="btn btn-outline-secondary w-100 btn-sm">
          ← Continuar Agregando
        </Link>
      </div>
    </div>
  );
}

export default ResumenPedido;
