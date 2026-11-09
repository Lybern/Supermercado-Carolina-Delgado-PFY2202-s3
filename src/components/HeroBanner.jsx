import { Link } from "react-router";
import OrangeTabbyCat from "./OrangeTabbyCat";

/**
 * Componente modular para el banner promocional principal de bienvenida.
 * Proporciona identidad visual, llamadas a la acción y elementos de confianza.
 */
function HeroBanner({ totalUnidadesCarrito }) {
  return (
    <div className="hero-banner p-4 p-md-5 mb-4 rounded-4 shadow-lg text-white text-center position-relative overflow-hidden">
      {/* Tarjeta flotante izquierda decorativa (visible en pantallas medianas+) */}
      <div className="hero-float-card hero-float-left d-none d-xl-flex align-items-center gap-2">
        <span className="fs-3">🍎</span>
        <div className="text-start">
          <strong className="d-block text-white" style={{ fontSize: "0.82rem" }}>100% Frescura</strong>
          <small className="text-white-50" style={{ fontSize: "0.72rem" }}>Directo a tu mesa</small>
        </div>
      </div>

      {/* Tarjeta flotante derecha decorativa (visible en pantallas medianas+) */}
      <div className="hero-float-card hero-float-right d-none d-xl-flex align-items-center gap-2">
        <span className="fs-3">🛡️</span>
        <div className="text-start">
          <strong className="d-block text-white" style={{ fontSize: "0.82rem" }}>Reserva Segura</strong>
          <small className="text-white-50" style={{ fontSize: "0.72rem" }}>Sin filas ni demoras</small>
        </div>
      </div>

      {/* Mascota institucional con aro de luz */}
      <div className="position-relative d-inline-block mb-2">
        <div className="d-inline-flex align-items-center justify-content-center bg-white p-2 rounded-circle shadow-lg mascot-glow">
          <OrangeTabbyCat size={58} />
        </div>
      </div>

      <div className="d-block mb-3">
        <span className="badge bg-white text-dark fw-bold px-3 py-2 text-uppercase shadow-sm hero-badge">
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

      {/* Cápsulas de beneficios con texto oscuro de alto contraste y legibilidad */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        <span className="pill-feature shadow-sm">
          <span className="pill-icon">🚚</span> Despacho Rápido
        </span>
        <span className="pill-feature shadow-sm">
          <span className="pill-icon">💰</span> Ahorro Garantizado
        </span>
        <span className="pill-feature shadow-sm">
          <span className="pill-icon">📦</span> Stock en Tiempo Real
        </span>
        <span className="pill-feature shadow-sm">
          <span className="pill-icon">✨</span> Atención Personalizada
        </span>
      </div>

      {/* Botones principales de acción con alto contraste */}
      <div className="d-flex flex-wrap justify-content-center gap-3 mb-3">
        <Link
          to="/carrito"
          className="btn btn-dark text-white fw-bold px-4 py-2 shadow d-flex align-items-center gap-2 hero-btn fs-6"
        >
          <span>🛒 Ver Mi Carrito</span>
          {totalUnidadesCarrito > 0 && (
            <span className="badge bg-danger rounded-pill">
              {totalUnidadesCarrito}
            </span>
          )}
        </Link>
        <Link
          to="/nuevo-producto"
          className="btn btn-outline-light fw-bold px-4 py-2 hero-btn fs-6 shadow-sm"
        >
          ➕ Ingresar Artículo
        </Link>
      </div>

      {/* Barra de confianza inferior dentro del banner */}
      <div className="hero-trust-bar pt-3 mt-3 border-top border-white border-opacity-10 d-flex flex-wrap justify-content-center gap-3 text-white-50 small">
        <span>⭐ <strong>4.9/5</strong> Preferencia Vecinal</span>
        <span className="d-none d-sm-inline">•</span>
        <span>⚡ <strong>100%</strong> Existencias Sincronizadas</span>
        <span className="d-none d-sm-inline">•</span>
        <span>📍 <strong>Santiago</strong> Envíos y Retiros</span>
      </div>
    </div>
  );
}

export default HeroBanner;
