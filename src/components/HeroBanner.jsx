import { Link } from "react-router";
import OrangeTabbyCat from "./OrangeTabbyCat";

/**
 * Componente modular para el banner promocional principal de bienvenida.
 */
function HeroBanner({ totalUnidadesCarrito }) {
  return (
    <div className="hero-banner p-4 p-md-5 mb-4 rounded-4 shadow-sm text-white text-center position-relative overflow-hidden">
      <div className="d-inline-flex align-items-center justify-content-center bg-white p-2 rounded-circle shadow-lg mb-3 mascot-glow">
        <OrangeTabbyCat size={52} />
      </div>

      <div className="d-block mb-2">
        <span className="badge bg-warning text-dark fw-bold px-3 py-1 text-uppercase shadow-sm" style={{ letterSpacing: "1px" }}>
          🐾 Propiedad de Eri Market
        </span>
      </div>

      <h1 className="display-5 fw-black mb-2 text-white">
        ¡Bienvenido a Supermercado Don Ahorro!
      </h1>

      <p className="lead mb-3 text-white-50 mx-auto" style={{ maxWidth: "680px" }}>
        Productos frescos, ahorro diario y la mejor calidad seleccionada para tu hogar.
        Explora los pasillos y compra con existencias en tiempo real.
      </p>

      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        <span className="badge bg-white bg-opacity-10 border border-white border-opacity-25 px-3 py-2 text-white feature-pill">
          🚚 Despacho Rápido
        </span>
        <span className="badge bg-white bg-opacity-10 border border-white border-opacity-25 px-3 py-2 text-white feature-pill">
          💰 Ahorro Garantizado
        </span>
        <span className="badge bg-white bg-opacity-10 border border-white border-opacity-25 px-3 py-2 text-white feature-pill">
          📦 Stock en Tiempo Real
        </span>
        <span className="badge bg-white bg-opacity-10 border border-white border-opacity-25 px-3 py-2 text-white feature-pill">
          ✨ Atención Personalizada
        </span>
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-3">
        <Link to="/carrito" className="btn btn-warning text-dark fw-bold px-4 py-2 shadow-sm d-flex align-items-center gap-2 hero-btn">
          <span>🛒 Ver Mi Carrito</span>
          {totalUnidadesCarrito > 0 && (
            <span className="badge bg-danger rounded-pill">
              {totalUnidadesCarrito}
            </span>
          )}
        </Link>
        <Link to="/nuevo-producto" className="btn btn-outline-light fw-semibold px-4 py-2 hero-btn">
          ➕ Ingresar Artículo
        </Link>
      </div>
    </div>
  );
}

export default HeroBanner;
