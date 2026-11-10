import { Link } from "react-router";
import { formatearMoneda } from "../utils/inventarioUtils";

const ESTILOS_CATEGORIA = {
  Abarrotes: "bg-amber-100 text-amber-900 border-amber-300",
  Lácteos: "bg-sky-100 text-sky-900 border-sky-300",
  "Frutas y Verduras": "bg-emerald-100 text-emerald-900 border-emerald-300",
  Carnicería: "bg-rose-100 text-rose-900 border-rose-300",
  Limpieza: "bg-cyan-100 text-cyan-900 border-cyan-300",
  Panadería: "bg-orange-100 text-orange-900 border-orange-300",
  Bebidas: "bg-purple-100 text-purple-900 border-purple-300",
};

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
 * Fila modular para un artículo en el carrito con diseño colorido y dinámico.
 */
function ItemCarrito({ item, producto, onAumentar, onDisminuir }) {
  if (!producto) return null;

  const subtotal = producto.precio * item.cantidad;
  const sinStock = Number(producto.stock) === 0;
  const badgeClase = ESTILOS_CATEGORIA[producto.categoria] || "bg-slate-100 text-slate-800 border-slate-300";
  const icono = ICONOS_CATEGORIA[producto.categoria] || "📦";

  return (
    <li className="list-group-item p-3.5 hover:bg-slate-50/80 transition-colors">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
        {/* Identificación y metadatos */}
        <div className="d-flex align-items-start gap-3">
          <span className="fs-3 p-2 rounded-2xl bg-slate-100 border border-slate-200 shadow-sm">
            {icono}
          </span>
          <div>
            <div className="d-flex align-items-center gap-2 mb-1 flex-wrap">
              <span className={`badge ${badgeClase} border shadow-xs fw-bold px-2.5 py-0.5`}>
                {icono} {producto.categoria}
              </span>
              <span className="badge bg-white text-slate-700 border shadow-xs px-2 py-0.5">
                {producto.marca}
              </span>
            </div>
            <h3 className="h6 fw-bold text-dark mb-1">
              <Link to={`/producto/${producto.id}`} className="text-decoration-none text-dark hover:text-emerald-700">
                {producto.nombre}
              </Link>
            </h3>
            <div className="text-muted small">
              Precio unitario: <strong>{formatearMoneda(producto.precio)}</strong> &bull; Bodega:{" "}
              <span className={sinStock ? "text-danger fw-bold" : "text-emerald-700 fw-semibold"}>
                {sinStock ? "Agotado" : `${producto.stock} disponibles`}
              </span>
            </div>
          </div>
        </div>

        {/* Controles de cantidad y subtotal destacado */}
        <div className="d-flex align-items-center justify-content-between justify-content-sm-end gap-3 ms-auto">
          <div className="d-flex align-items-center bg-white border border-slate-300 rounded-xl p-1 shadow-sm">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary px-2.5 py-0.5 border-0 hover:bg-rose-50 hover:text-rose-600 rounded-lg"
              onClick={() => onDisminuir(item)}
              aria-label={`Disminuir una unidad de ${producto.nombre}`}
            >
              -
            </button>
            <span className="fw-black px-3 text-center text-dark" style={{ minWidth: "35px" }}>
              {item.cantidad}
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary px-2.5 py-0.5 border-0 hover:bg-emerald-50 hover:text-emerald-600 rounded-lg"
              onClick={() => onAumentar(item)}
              disabled={sinStock}
              aria-label={`Aumentar una unidad de ${producto.nombre}`}
              title={sinStock ? "No quedan más existencias en bodega" : "Agregar una unidad"}
            >
              +
            </button>
          </div>

          <div className="text-end bg-emerald-50/80 px-3 py-1.5 rounded-xl border border-emerald-200/80 shadow-xs" style={{ minWidth: "105px" }}>
            <span className="fw-black text-emerald-800 d-block fs-5">
              {formatearMoneda(subtotal)}
            </span>
            <small className="text-emerald-700 fw-semibold" style={{ fontSize: "0.7rem" }}>
              Subtotal ({item.cantidad} un.)
            </small>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ItemCarrito;
