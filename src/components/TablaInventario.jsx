import { Link } from "react-router";
import {
  esStockCritico,
  obtenerEstadoStock,
  formatearMoneda,
} from "../utils/inventarioUtils";

/**
 * Componente modular: Tabla de Inventario de Supermercado.
 * Resuelve la oportunidad de mejora 5 de la pauta y soporta navegación al detalle para Semana 3 (<150 líneas).
 * @param {{ productos: Array, onModificarStock: Function, mostrarLinkDetalle?: boolean }} props
 */
function TablaInventario({ productos = [], onModificarStock, mostrarLinkDetalle = true }) {
  if (productos.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        <span className="fs-1 d-block mb-2">🔍</span>
        <p className="mb-0 fw-semibold">No se encontraron productos coincidentes con los filtros seleccionados.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th scope="col">SKU</th>
            <th scope="col">Artículo</th>
            <th scope="col">Marca</th>
            <th scope="col">Categoría</th>
            <th scope="col" className="text-end">Precio</th>
            <th scope="col" className="text-center">Stock</th>
            <th scope="col" className="text-center">Estado</th>
            <th scope="col" className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((item) => {
            const estadoInfo = obtenerEstadoStock(item);
            const esCritico = esStockCritico(item);

            return (
              <tr key={item.id} className={esCritico ? "table-danger-subtle" : ""}>
                <td className="fw-mono text-secondary small">
                  <code>{item.sku}</code>
                </td>
                <td>
                  <div className="fw-semibold text-dark">{item.nombre}</div>
                  <small className="text-muted">{item.unidad}</small>
                </td>
                <td>
                  <span className="badge bg-light text-dark border">{item.marca}</span>
                </td>
                <td>
                  <span className="badge bg-secondary-subtle text-secondary-emphasis">
                    {item.categoria}
                  </span>
                </td>
                <td className="text-end fw-semibold">
                  {formatearMoneda(item.precio)}
                </td>
                <td className="text-center">
                  <div className="d-flex align-items-center justify-content-center gap-1">
                    {onModificarStock && (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary px-2 py-0"
                        onClick={() => onModificarStock(item.id, -1)}
                        disabled={item.stock === 0}
                        title="Disminuir stock en 1"
                      >
                        -
                      </button>
                    )}
                    <span
                      className={`fw-bold px-2 py-1 rounded small ${
                        esCritico ? "bg-danger-subtle text-danger" : "text-dark"
                      }`}
                      style={{ minWidth: "35px", textAlign: "center" }}
                    >
                      {item.stock}
                    </span>
                    {onModificarStock && (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary px-2 py-0"
                        onClick={() => onModificarStock(item.id, 1)}
                        title="Aumentar stock en 1"
                      >
                        +
                      </button>
                    )}
                  </div>
                  <div className="text-center text-muted" style={{ fontSize: "0.7rem" }}>
                    Mín: {item.stockMinimo}
                  </div>
                </td>
                <td className="text-center">
                  <span className={`badge ${estadoInfo.badgeClass}`}>
                    {estadoInfo.estado}
                  </span>
                </td>
                <td className="text-center">
                  {mostrarLinkDetalle ? (
                    <Link
                      to={`/producto/${item.id}`}
                      className="btn btn-sm btn-outline-success fw-semibold"
                      title="Ver detalle del producto"
                    >
                      👁️ Detalle
                    </Link>
                  ) : (
                    <span className="text-muted small">{item.ubicacion}</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TablaInventario;
