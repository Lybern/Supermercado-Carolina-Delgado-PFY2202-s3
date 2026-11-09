import { useState } from "react";
import { Link } from "react-router";
import useInventario from "../hooks/useInventario";
import ItemCarrito from "../components/ItemCarrito";
import { formatearMoneda } from "../utils/inventarioUtils";

/**
 * Vista del Carrito de Compras.
 * Permite gestionar las unidades reservadas y sincronizarlas con el inventario general.
 */
function Carrito() {
  const { productos, carrito, agregarAlCarrito, disminuirCantidadCarrito } = useInventario();
  const [aviso, setAviso] = useState("");

  // Calcula el total de unidades reservadas en el carrito
  const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  // Busca los datos completos del producto a partir de su ID
  const obtenerProducto = (productoId) =>
    productos.find((p) => String(p.id) === String(productoId));

  // Calcula el total a pagar en pesos chilenos
  const totalPagar = carrito.reduce((acc, item) => {
    const prod = obtenerProducto(item.productoId);
    return acc + (prod ? prod.precio * item.cantidad : 0);
  }, 0);

  const handleAumentar = (item) => {
    const prod = obtenerProducto(item.productoId);
    if (!prod || prod.stock <= 0) return;
    agregarAlCarrito(item.productoId);
    setAviso(`Se aumentó la cantidad de "${prod.nombre}".`);
  };

  const handleDisminuir = (item) => {
    const prod = obtenerProducto(item.productoId);
    disminuirCantidadCarrito(item.productoId);
    if (item.cantidad === 1) {
      setAviso(`"${prod?.nombre || "El artículo"}" fue retirado del carrito.`);
    } else {
      setAviso(`Se disminuyó la cantidad de "${prod?.nombre}".`);
    }
  };

  return (
    <div className="container py-4">
      {/* Navegación contextual */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none text-success">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/inventario" className="text-decoration-none text-success">Inventario</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Carrito de Compras
          </li>
        </ol>
      </nav>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 pb-2 border-bottom">
        <div>
          <h1 className="h2 fw-bold text-dark mb-1 d-flex align-items-center gap-2">
            <span>🛒</span> Carrito de Compras
          </h1>
          <p className="text-muted mb-0">
            Revisa tus artículos seleccionados. Cada cambio actualiza las existencias del inventario en tiempo real.
          </p>
        </div>
        <div className="mt-3 mt-md-0">
          <Link to="/inventario" className="btn btn-outline-secondary btn-sm">
            ← Seguir Comprando
          </Link>
        </div>
      </div>

      {/* Notificación accesible para el usuario */}
      {aviso && (
        <div aria-live="polite" role="status" className="alert alert-info alert-dismissible fade show mb-4">
          <span>ℹ️ {aviso}</span>
          <button type="button" className="btn-close" onClick={() => setAviso("")} aria-label="Cerrar"></button>
        </div>
      )}

      {/* Si el carrito está vacío */}
      {carrito.length === 0 ? (
        <div className="card shadow-sm border-0 text-center p-5 my-4">
          <span className="display-4 d-block mb-3">🛒</span>
          <h2 className="h4 fw-bold text-dark mb-2">Tu carrito está vacío</h2>
          <p className="text-muted mb-4">Aún no has agregado productos. Explora el inventario para reservar los artículos que necesitas.</p>
          <div>
            <Link to="/inventario" className="btn btn-success fw-semibold px-4">Ver Catálogo Disponible</Link>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          {/* Listado de artículos en el carrito */}
          <div className="col-12 col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                <h2 className="h6 mb-0 fw-bold text-dark">
                  Artículos en el Carrito ({totalUnidades} unidades)
                </h2>
              </div>

              <ul className="list-group list-group-flush">
                {carrito.map((item) => (
                  <ItemCarrito
                    key={item.productoId}
                    item={item}
                    producto={obtenerProducto(item.productoId)}
                    onAumentar={handleAumentar}
                    onDisminuir={handleDisminuir}
                  />
                ))}
              </ul>
            </div>
          </div>

          {/* Resumen de Compra */}
          <div className="col-12 col-lg-4">
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
                  <span className="fw-semibold text-dark">{carrito.length}</span>
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
                  onClick={() => alert("¡Pedido simulado con éxito! Las existencias se han reservado.")}
                >
                  Finalizar Pedido
                </button>
                <Link to="/inventario" className="btn btn-outline-secondary w-100 btn-sm">
                  Continuar Agregando
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;
