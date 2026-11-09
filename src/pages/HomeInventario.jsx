import { useState } from "react";
import { Link } from "react-router";
import useInventario from "../hooks/useInventario";
import { CATEGORIAS_INVENTARIO } from "../data/inventarioData";
import OrangeTabbyCat from "../components/OrangeTabbyCat";
import KpiResumen from "../components/KpiResumen";
import FiltrosInventario from "../components/FiltrosInventario";
import TarjetaProducto from "../components/TarjetaProducto";
import TablaInventario from "../components/TablaInventario";
import {
  filtrarProductos,
  calcularMetricasInventario,
} from "../utils/inventarioUtils";

/**
 * Vista Principal del Supermercado.
 * Ofrece una experiencia amigable tipo catálogo online con opción de alternar a tabla.
 */
function HomeInventario() {
  const { productos, carrito, agregarAlCarrito, modificarStock } = useInventario();

  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [soloCriticos, setSoloCriticos] = useState(false);
  const [modoVista, setModoVista] = useState("tarjetas"); // 'tarjetas' o 'tabla'

  const totalUnidadesCarrito = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const categorias = ["Todas", ...CATEGORIAS_INVENTARIO];

  // Filtrado reactivo puro y métricas centralizadas
  const productosFiltrados = filtrarProductos(productos, {
    busqueda,
    categoria: categoriaSeleccionada,
    soloCriticos,
  });

  const metricas = calcularMetricasInventario(productos);

  return (
    <div className="container py-4">
      {/* Banner Centrado, Cálido y Amigable */}
      <div className="hero-banner p-4 p-md-5 mb-4 rounded-4 shadow-sm text-white text-center position-relative overflow-hidden">
        {/* Mascota en el centro con brillo */}
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

        {/* Insignias de confianza interactivas */}
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

        {/* Acciones principales centradas */}
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

      {/* Métricas Generales del Negocio */}
      <KpiResumen metricas={metricas} totalCategorias={CATEGORIAS_INVENTARIO.length} />

      {/* Barra de Filtros y Búsqueda Interactiva */}
      <FiltrosInventario
        busqueda={busqueda}
        onBusquedaChange={setBusqueda}
        categoriaSeleccionada={categoriaSeleccionada}
        onCategoriaChange={setCategoriaSeleccionada}
        categorias={categorias}
        soloCriticos={soloCriticos}
        onSoloCriticosChange={setSoloCriticos}
        stockCriticoCount={metricas.stockCriticoCount}
      />

      {/* Barra de Control de Vista (Tarjetas vs Tabla) */}
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h2 className="h5 fw-bold text-dark mb-0">
          Catálogo de Productos ({productosFiltrados.length} artículos)
        </h2>
        <div className="btn-group btn-group-sm shadow-sm" role="group">
          <button
            type="button"
            className={`btn ${modoVista === "tarjetas" ? "btn-success fw-bold" : "btn-outline-secondary"}`}
            onClick={() => setModoVista("tarjetas")}
          >
            🛍️ Vista Tarjetas
          </button>
          <button
            type="button"
            className={`btn ${modoVista === "tabla" ? "btn-success fw-bold" : "btn-outline-secondary"}`}
            onClick={() => setModoVista("tabla")}
          >
            📋 Vista Tabla
          </button>
        </div>
      </div>

      {/* Renderizado dinámico según la vista elegida */}
      {productosFiltrados.length === 0 ? (
        <div className="card shadow-sm border-0 text-center py-5">
          <span className="fs-1 d-block mb-2">🔍</span>
          <p className="text-muted fw-semibold mb-0">
            No se encontraron productos coincidentes con los filtros seleccionados.
          </p>
        </div>
      ) : modoVista === "tarjetas" ? (
        <div className="row g-3">
          {productosFiltrados.map((item) => (
            <TarjetaProducto
              key={item.id}
              producto={item}
              onAgregarAlCarrito={agregarAlCarrito}
            />
          ))}
        </div>
      ) : (
        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            <TablaInventario
              productos={productosFiltrados}
              onModificarStock={modificarStock}
              mostrarLinkDetalle={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeInventario;
