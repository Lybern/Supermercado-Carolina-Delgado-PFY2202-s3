import { useState } from "react";
import { Link } from "react-router";
import useInventario from "../hooks/useInventario";
import ItemCarrito from "../components/ItemCarrito";
import ResumenPedido from "../components/ResumenPedido";

/**
 * Vista del Carrito de Compras.
 * Permite gestionar las unidades reservadas y sincronizarlas con el inventario general.
 */
function Carrito() {
  const { productos, carrito, agregarAlCarrito, disminuirCantidadCarrito, vaciarCarrito } = useInventario();
  const [aviso, setAviso] = useState("");

  const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const obtenerProducto = (productoId) =>
    productos.find((p) => String(p.id) === String(productoId));

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

  const handleVaciar = () => {
    if (window.confirm("¿Seguro que deseas vaciar el carrito? Todas las unidades volverán al inventario.")) {
      vaciarCarrito();
      setAviso("El carrito ha sido vaciado y las existencias han vuelto al inventario.");
    }
  };

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none text-success">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/inventario" className="text-decoration-none text-success">Inventario</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">Carrito de Compras</li>
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

      {aviso && (
        <div aria-live="polite" role="status" className="alert alert-info alert-dismissible fade show mb-4">
          <span>ℹ️ {aviso}</span>
          <button type="button" className="btn-close" onClick={() => setAviso("")} aria-label="Cerrar"></button>
        </div>
      )}

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
          <div className="col-12 col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white py-3">
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

          <div className="col-12 col-lg-4">
            <ResumenPedido
              totalUnidades={totalUnidades}
              totalArticulos={carrito.length}
              totalPagar={totalPagar}
              onFinalizar={() => alert("¡Pedido simulado con éxito! Las existencias se han reservado.")}
              onVaciar={handleVaciar}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;
