import { useState } from "react";
import { Link, useParams } from "react-router";
import useInventario from "../hooks/useInventario";
import FichaDetalleStock from "../components/FichaDetalleStock";
import { formatearMoneda, obtenerEstadoStock, esStockCritico } from "../utils/inventarioUtils";

/**
 * Vista de Detalle de Producto.
 * Permite visualizar las existencias y añadir unidades al carrito de compras.
 */
function DetalleProducto() {
  const { id } = useParams();
  const { productos, agregarAlCarrito } = useInventario();
  const [mensajeFeedback, setMensajeFeedback] = useState("");

  const producto = productos.find((p) => String(p.id) === String(id));

  if (!producto) {
    return (
      <div className="container py-5">
        <div className="card shadow-sm border-0 text-center p-5 mx-auto" style={{ maxWidth: "550px" }}>
          <span className="display-3 d-block mb-3">🔍</span>
          <h1 className="h3 fw-bold text-dark mb-2">Producto No Encontrado</h1>
          <p className="text-muted mb-4">
            El artículo con identificador <code>{id}</code> no existe en el catálogo o fue retirado del inventario.
          </p>
          <div>
            <Link to="/inventario" className="btn btn-success fw-semibold">← Volver al Inventario</Link>
          </div>
        </div>
      </div>
    );
  }

  const sinStock = Number(producto.stock) === 0;
  const esCritico = esStockCritico(producto);
  const estadoInfo = obtenerEstadoStock(producto);

  const handleAgregar = () => {
    if (sinStock) return;
    agregarAlCarrito(producto.id);
    setMensajeFeedback(`¡Agregaste "${producto.nombre}" al carrito de compras!`);
  };

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-success">Inicio</Link></li>
          <li className="breadcrumb-item"><Link to="/inventario" className="text-decoration-none text-success">Inventario</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{producto.nombre}</li>
        </ol>
      </nav>

      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <Link to="/inventario" className="btn btn-outline-secondary btn-sm">← Volver al Listado</Link>
        <Link to="/carrito" className="btn btn-outline-success btn-sm fw-semibold">🛒 Ir al Carrito de Compras</Link>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
              <span className="badge bg-secondary-subtle text-secondary-emphasis fs-6">🏷️ {producto.categoria}</span>
              <span className="badge bg-light text-dark border">Marca: <strong>{producto.marca}</strong></span>
            </div>

            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                <div>
                  <h1 className="h2 fw-bold text-dark mb-1">{producto.nombre}</h1>
                  <span className="text-muted small">Código SKU: <code>{producto.sku}</code></span>
                </div>
                <div className="text-end">
                  <span className="fs-3 fw-bold text-success d-block">{formatearMoneda(producto.precio)}</span>
                  <small className="text-muted">Por {producto.unidad}</small>
                </div>
              </div>

              <FichaDetalleStock
                stock={producto.stock}
                stockMinimo={producto.stockMinimo}
                estadoInfo={estadoInfo}
                ubicacion={producto.ubicacion}
              />

              <div className="d-grid gap-2 d-md-flex align-items-md-center justify-content-md-between mt-4 pt-3 border-top">
                <div>
                  {sinStock ? (
                    <span className="badge bg-danger-subtle text-danger border border-danger-subtle p-2">
                      ⚠️ Este artículo se encuentra agotado temporalmente
                    </span>
                  ) : esCritico ? (
                    <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle p-2">
                      ⚠️ ¡Últimas unidades disponibles!
                    </span>
                  ) : (
                    <span className="text-muted small">✅ Producto disponible para compra inmediata</span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleAgregar}
                  disabled={sinStock}
                  className="btn btn-success btn-lg px-4 fw-bold shadow-sm"
                >
                  {sinStock ? "Sin Stock" : "🛒 Agregar al Carrito"}
                </button>
              </div>

              {mensajeFeedback && (
                <div aria-live="polite" role="status" className="alert alert-success alert-dismissible fade show mt-3 mb-0">
                  <span>✅ {mensajeFeedback}</span>
                  <button type="button" className="btn-close" onClick={() => setMensajeFeedback("")} aria-label="Cerrar aviso"></button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleProducto;
