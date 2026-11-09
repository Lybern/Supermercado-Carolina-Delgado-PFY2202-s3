import { Link } from "react-router";
import {
  formatearMoneda,
  obtenerEstadoStock,
  esStockCritico,
} from "../utils/inventarioUtils";

const ICONOS_CATEGORIA = {
  Abarrotes: "🍚",
  Lácteos: "🥛",
  "Frutas y Verduras": "🍎",
  Carnicería: "🥩",
  Limpieza: "🧼",
  Panadería: "🥖",
  Bebidas: "🧃",
};

/**
 * Tarjeta interactiva de producto con animaciones al pasar el mouse.
 * Presenta el artículo de forma atractiva con acciones rápidas de compra y detalle.
 */
function TarjetaProducto({ producto, onAgregarAlCarrito }) {
  const sinStock = Number(producto.stock) === 0;
  const esCritico = esStockCritico(producto);
  const estadoInfo = obtenerEstadoStock(producto);
  const icono = ICONOS_CATEGORIA[producto.categoria] || "📦";

  return (
    <div className="col-12 col-sm-6 col-md-4 col-xl-3">
      <div className={`card h-100 shadow-sm border-0 product-card transition-all ${esCritico ? "border-danger border-top border-3" : ""}`}>
        {/* Cabecera visual con ícono animado */}
        <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
          <span className="badge category-tag shadow-sm px-3 py-1 d-flex align-items-center gap-1">
            <span className="product-emoji fs-5">{icono}</span>
            <span className="fw-semibold text-dark">{producto.categoria}</span>
          </span>
          <span className="badge bg-light text-secondary border px-2 py-1">
            {producto.marca}
          </span>
        </div>

        {/* Cuerpo del producto */}
        <div className="card-body p-3 d-flex flex-column">
          <div className="mb-2">
            <span className="text-muted small fw-mono"><code>{producto.sku}</code></span>
            <h3 className="h6 fw-bold text-dark mt-1 mb-1 product-title" title={producto.nombre}>
              {producto.nombre}
            </h3>
            <span className="text-muted small d-block">
              {producto.unidad} &bull; <span className="text-secondary">{producto.ubicacion}</span>
            </span>
          </div>

          <div className="mt-auto pt-3 border-top">
            <div className="d-flex justify-content-between align-items-baseline mb-3">
              <span className="fs-4 fw-black text-success price-tag">
                {formatearMoneda(producto.precio)}
              </span>
              <span className={`badge ${estadoInfo.badgeClass} rounded-pill px-2 py-1`}>
                {estadoInfo.estado} ({producto.stock})
              </span>
            </div>

            {/* Botones de acción */}
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-success btn-sm flex-grow-1 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-1 interactive-add-btn"
                onClick={() => onAgregarAlCarrito(producto.id)}
                disabled={sinStock}
                title={sinStock ? "Sin existencias disponibles" : "Agregar una unidad al carrito"}
              >
                <span>🛒</span>
                <span>{sinStock ? "Agotado" : "Agregar"}</span>
              </button>

              <Link
                to={`/producto/${producto.id}`}
                className="btn btn-outline-secondary btn-sm px-3 fw-semibold detail-btn"
                title="Ver detalles completos del producto"
              >
                Detalle
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TarjetaProducto;
