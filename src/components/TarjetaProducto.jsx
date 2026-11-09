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
 * Tarjeta visual de producto estilo e-commerce.
 * Presenta el artículo de forma atractiva, amigable y permite añadir directamente al carrito.
 */
function TarjetaProducto({ producto, onAgregarAlCarrito }) {
  const sinStock = Number(producto.stock) === 0;
  const esCritico = esStockCritico(producto);
  const estadoInfo = obtenerEstadoStock(producto);
  const icono = ICONOS_CATEGORIA[producto.categoria] || "📦";

  return (
    <div className="col-12 col-sm-6 col-md-4 col-xl-3">
      <div className={`card h-100 shadow-sm border-0 product-card transition-all ${esCritico ? "border-top border-3 border-danger" : ""}`}>
        {/* Encabezado visual de la tarjeta */}
        <div className="card-header bg-light border-0 py-3 d-flex justify-content-between align-items-center">
          <span className="badge bg-white text-dark shadow-sm border px-2 py-1">
            {icono} {producto.categoria}
          </span>
          <span className="badge bg-secondary-subtle text-secondary-emphasis">
            {producto.marca}
          </span>
        </div>

        {/* Cuerpo con información principal */}
        <div className="card-body p-3 d-flex flex-column">
          <div className="mb-2">
            <span className="text-muted small fw-mono"><code>{producto.sku}</code></span>
            <h3 className="h6 fw-bold text-dark mt-1 mb-0 product-title" title={producto.nombre}>
              {producto.nombre}
            </h3>
            <span className="text-muted small">{producto.unidad} &bull; {producto.ubicacion}</span>
          </div>

          <div className="mt-auto pt-2 border-top">
            <div className="d-flex justify-content-between align-items-baseline mb-2">
              <span className="fs-4 fw-bold text-success">
                {formatearMoneda(producto.precio)}
              </span>
              <span className={`badge ${estadoInfo.badgeClass}`}>
                {estadoInfo.estado} ({producto.stock})
              </span>
            </div>

            {/* Acciones principales */}
            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-success btn-sm flex-grow-1 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-1"
                onClick={() => onAgregarAlCarrito(producto.id)}
                disabled={sinStock}
                title={sinStock ? "Sin existencias disponibles" : "Agregar una unidad al carrito"}
              >
                <span>🛒</span>
                <span>{sinStock ? "Agotado" : "Agregar"}</span>
              </button>

              <Link
                to={`/producto/${producto.id}`}
                className="btn btn-outline-secondary btn-sm px-2"
                title="Ver detalles completos del producto"
              >
                👁️
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TarjetaProducto;
