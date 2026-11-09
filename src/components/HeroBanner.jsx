import { Link } from "react-router";
import OrangeTabbyCat from "./OrangeTabbyCat";

/**
 * Componente modular para el banner promocional principal de bienvenida.
 */
function HeroBanner({ totalUnidadesCarrito }) {
  return (
    <div className="hero-banner p-4 p-md-5 mb-4 rounded-4 shadow text-white text-center position-relative overflow-hidden">
      <div className="d-inline-flex align-items-center justify-content-center bg-white p-2 rounded-circle shadow-lg mb-3 mascot-glow">
        <OrangeTabbyCat size={56} />
      </div>

      <div className="d-block mb-3">
        <span className="badge bg-warning text-dark fw-bold px-3 py-2 text-uppercase shadow-sm" style={{ letterSpacing: "1.2px", fontSize: "0.85rem" }}>
          🐾 Propiedad de Eri Market
        </span>
      </div>

      <h1 className="hero-title fw-bold text-white mb-3">
        ¡Bienvenido a Supermercado Don Ahorro!
      </h1>

      <p className="hero-subtitle text-white mb-4 mx-auto">
        Productos frescos seleccionados, precios convenientes y ahorro diario para tu hogar.
        Explora nuestros pasillos y administra existencias en tiempo real.
      </p>

      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        <span className="badge bg-white bg-opacity-20 border border-white border-opacity-30 px-3 py-2 text-white feature-pill fw-semibold">
          🚚 Despacho Rápido
        </span>
        <span className="badge bg-white bg-opacity-20 border border-white border-opacity-30 px-3 py-2 text-white feature-pill fw-semibold">
          💰 Ahorro Garantizado
        </span>
        <span className="badge bg-white bg-opacity-20 border border-white border-opacity-30 px-3 py-2 text-white feature-pill fw-semibold">
          📦 Stock en Tiempo Real
        </span>
        <span className="badge bg-white bg-opacity-20 border border-white border-opacity-30 px-3 py-2 text-white feature-pill fw-semibold">
          ✨ Atención Personalizada
        </span>
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-3">
        <Link to="/carrito" className="btn btn-warning text-dark fw-bold px-4 py-2 shadow d-flex align-items-center gap-2 hero-btn fs-6">
          <span>🛒 Ver Mi Carrito</span>
          {totalUnidadesCarrito > 0 && (
            <span className="badge bg-danger rounded-pill">
              {totalUnidadesCarrito}
            </span>
          )}
        </Link>
        <Link to="/nuevo-producto" className="btn btn-outline-light fw-bold px-4 py-2 hero-btn fs-6 shadow-sm">
          ➕ Ingresar Artículo
        </Link>
      </div>
    </div>
  );
}

export default HeroBanner;
