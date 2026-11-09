import { Link } from "react-router";
import { formatearMoneda } from "../utils/inventarioUtils";

/**
 * Fila individual para un artículo en el carrito de compras.
 * Permite ajustar cantidades en tiempo real.
 */
function ItemCarrito({ item, producto, onAumentar, onDisminuir }) {
  if (!producto) return null;

  const subtotal = producto.precio * item.cantidad;
  const sinStock = Number(producto.stock) === 0;

  return (
    <li className="list-group-item p-3">
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className="badge bg-secondary-subtle text-secondary-emphasis">
              {producto.categoria}
            </span>
            <span className="badge bg-light text-dark border">
              {producto.marca}
            </span>
          </div>
          <h3 className="h6 fw-bold text-dark mb-1">
            <Link to={`/producto/${producto.id}`} className="text-decoration-none text-dark">
              {producto.nombre}
            </Link>
          </h3>
          <div className="text-muted small">
            Precio unitario: {formatearMoneda(producto.precio)} | Disponibles en bodega:{" "}
            <span className={sinStock ? "text-danger fw-semibold" : "text-dark"}>
              {producto.stock}
            </span>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between justify-content-sm-end gap-3">
          {/* Controles interactivos de cantidad */}
          <div className="d-flex align-items-center border rounded-2 p-1 bg-light">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary px-2 py-0 border-0"
              onClick={() => onDisminuir(item)}
              aria-label={`Disminuir una unidad de ${producto.nombre}`}
            >
              -
            </button>
            <span className="fw-bold px-3 text-center" style={{ minWidth: "35px" }}>
              {item.cantidad}
            </span>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary px-2 py-0 border-0"
              onClick={() => onAumentar(item)}
              disabled={sinStock}
              aria-label={`Aumentar una unidad de ${producto.nombre}`}
              title={sinStock ? "No quedan más existencias en inventario" : "Agregar una unidad"}
            >
              +
            </button>
          </div>

          {/* Subtotal del artículo */}
          <div className="text-end" style={{ minWidth: "90px" }}>
            <span className="fw-bold text-success d-block">
              {formatearMoneda(subtotal)}
            </span>
            <small className="text-muted" style={{ fontSize: "0.75rem" }}>
              Subtotal
            </small>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ItemCarrito;
